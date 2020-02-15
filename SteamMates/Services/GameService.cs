using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Models.Persistence;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SteamMates.Services
{
    public class GameService : ServiceBase
    {
        private readonly SteamContext _context;

        public GameService(IOptions<AppSecrets> secrets, IMemoryCache cache, SteamContext context)
            : base(secrets, cache)
        {
            _context = context;
        }

        public async Task<GameCollection> GetGamesInCommonAsync(ICollection<string> userIds)
        {
            var libraries = await GetGameLibrariesAsync(userIds);

            libraries.Sort();

            TagCollection tagCollection;
            try
            {
                tagCollection = await GetGameIdsByTagsAsync(false);
            }
            catch (Exception e) when (
                e is TagUnavailableException ||
                e is ApiUnavailableException ||
                e is JsonReaderException)
            {
                tagCollection = await GetGameIdsByTagsAsync(true);
            }

            return new GameCollection
            {
                Games = FilterLibraries(libraries, tagCollection).ToList(),
                LatestUpdates = GetLatestUpdates(libraries, tagCollection.LatestUpdate)
            };
        }

        public async Task<bool> RateGameAsync(RatedGame ratedGame)
        {
            var rating = await FindRatingAsync(ratedGame.UserId, ratedGame.GameId);

            if (rating != null)
            {
                await UpdateRatingAsync(rating, ratedGame.Rating);

                return false;
            }

            await AddRatingAsync(ratedGame);

            return true;
        }

        public async Task<bool> UserHasGameAsync(string userId, int gameId)
        {
            var library = await GetGameLibraryAsync(userId);

            return library.Games
                .Select(x => x.AppId)
                .Contains(gameId);
        }

        private async Task<List<GameLibrary>> GetGameLibrariesAsync(IEnumerable<string> userIds)
        {
            return (
                await Task.WhenAll(
                    userIds.Select(async id => await GetGameLibraryAsync(id)))
                ).ToList();
        }

        private async Task<GameLibrary> GetGameLibraryAsync(string userId)
        {
            return await Cache.GetOrCreate(userId, async entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                return await FetchGameLibraryAsync(userId);
            });
        }

        private async Task<GameLibrary> FetchGameLibraryAsync(string userId)
        {
            var url = SteamUtils.GetOwnedGamesUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = await GetJsonObject(url, SteamUtils.ApiName);

            var games = jsonObj["response"]["games"]
                ?.Children()
                .Select(token => token.ToObject<PlayedGame>())
                .ToList();

            if (games == null)
            {
                throw new LibraryUnavailableException("Could not access library.", userId);
            }

            return new GameLibrary
            {
                UserId = userId,
                Games = games,
                LatestUpdate = DateTime.Now
            };
        }

        private async Task<TagCollection> GetGameIdsByTagsAsync(bool useBackup)
        {
            if (useBackup)
            {
                return await CreateTagCollectionAsync(GetGameIdsByTagFromBackupAsync, true);
            }

            return await Cache.GetOrCreate(SiteUtils.CacheKeys.Tags, async entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromHours(6));

                return await CreateTagCollectionAsync(FetchGameIdsByTagAsync, false);
            });
        }

        private async Task<TagCollection> CreateTagCollectionAsync(
            Func<string, Task<JObject>> getJsonObject, bool isBackupUsed)
        {
            var task = SteamSpyUtils.Tags.Select(
                async tag => new KeyValuePair<string, List<int>>(
                    tag, await GetGameIdsByTagAsync(tag, getJsonObject, isBackupUsed)));

            var result = (await Task.WhenAll(task))
                .ToDictionary(p => p.Key, p => p.Value);

            var tagCollection = new TagCollection { GameIdsByTags = result };

            if (!isBackupUsed)
            {
                tagCollection.LatestUpdate = DateTime.Now;
            }

            return tagCollection;
        }

        private async Task<JObject> FetchGameIdsByTagAsync(string tag)
        {
            var url = SteamSpyUtils.GetGamesByTagUrl(tag);

            return await GetJsonObject(url, SteamSpyUtils.ApiName);
        }

        private async Task<JObject> GetGameIdsByTagFromBackupAsync(string tag)
        {
            try
            {
                string jsonStr;
                using (var r = new StreamReader($"Backups/Tags/{tag}.json"))
                {
                    jsonStr = await r.ReadToEndAsync();
                }

                return JObject.Parse(jsonStr);
            }
            catch (Exception e) when (
                e is FileNotFoundException ||
                e is DirectoryNotFoundException ||
                e is IOException ||
                e is JsonReaderException)
            {
                throw new TagUnavailableException(SteamSpyUtils.GetTagErrorMessage(true), tag, e);
            }
        }

        private async Task<List<int>> GetGameIdsByTagAsync(
            string tag, Func<string, Task<JObject>> getJsonObject, bool isBackupUsed)
        {
            var jsonObj = await getJsonObject(tag);

            var gameIds = jsonObj.ToObject<Dictionary<int, object>>().Keys.ToList();

            if (gameIds.Count == 0)
            {
                throw new TagUnavailableException(SteamSpyUtils.GetTagErrorMessage(isBackupUsed), tag);
            }

            return gameIds;
        }

        private IEnumerable<GameStat> FilterLibraries(IList<GameLibrary> libraries, TagCollection tagCollection)
        {
            return
                from game in libraries[0].Games
                let playTimes = GetPlayTimes(game.AppId, libraries)
                let tags = GetTags(game.AppId, tagCollection)
                where !playTimes.ContainsValue(null) && tags.Count > 0
                select new GameStat
                {
                    Game = game,
                    PlayTimes = ConvertToPlayTimeList(playTimes),
                    Tags = tags
                };
        }

        private ImmutableSortedDictionary<string, int?> GetPlayTimes(int gameId, IEnumerable<GameLibrary> libraries)
        {
            return libraries.ToImmutableSortedDictionary(
                library => library.UserId,
                library => library.Games
                    .Find(game => game.AppId == gameId)?.PlayTime);
        }

        private List<PlayTimeInfo> ConvertToPlayTimeList(ImmutableSortedDictionary<string, int?> playTimes)
        {
            return playTimes
                .Select(pair => new PlayTimeInfo(pair.Key, Convert.ToInt32(pair.Value)))
                .ToList();
        }

        private List<string> GetTags(int gameId, TagCollection tagCollection)
        {
            return
                (from pair in tagCollection.GameIdsByTags
                 where pair.Value.Any(id => id == gameId)
                 select pair.Key)
                .ToList();
        }

        private Dictionary<string, DateTime?> GetLatestUpdates(IEnumerable<GameLibrary> libraries, DateTime? tagUpdate)
        {
            var dict = libraries.ToDictionary(x => x.UserId, x => x.LatestUpdate);

            dict.Add("tags", tagUpdate);

            return dict;
        }

        private async Task<Rating> FindRatingAsync(string userId, int gameId)
        {
            return await (
                from rating in _context.Ratings
                join user in _context.Users on rating.UserId equals user.Id
                join game in _context.Games on rating.GameId equals game.Id
                where user.SteamId == userId && game.SteamId == gameId
                select rating
            ).FirstOrDefaultAsync();
        }

        private async Task AddRatingAsync(RatedGame ratedGame)
        {
            var user = await FindUserIdentifierAsync(ratedGame.UserId);
            var game = await FindGameIdentifierAsync(ratedGame.GameId);
            var createIdentifier = user == null || game == null;

            if (user == null)
            {
                user = new UserIdentifier { SteamId = ratedGame.UserId };

                await _context.Users.AddAsync(user);
            }

            if (game == null)
            {
                game = new GameIdentifier { SteamId = ratedGame.GameId };

                await _context.Games.AddAsync(game);
            }

            if (createIdentifier)
            {
                await _context.SaveChangesAsync();
            }

            var rating = new Rating { Game = game, User = user, Value = ratedGame.Rating };

            await _context.Ratings.AddAsync(rating);
            await _context.SaveChangesAsync();
        }

        private async Task UpdateRatingAsync(Rating rating, int newValue)
        {
            rating.Value = newValue;

            _context.Ratings.Update(rating);
            await _context.SaveChangesAsync();
        }

        private async Task<UserIdentifier> FindUserIdentifierAsync(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.SteamId == userId);
        }

        private async Task<GameIdentifier> FindGameIdentifierAsync(int gameId)
        {
            return await _context.Games.FirstOrDefaultAsync(x => x.SteamId == gameId);
        }
    }
}
