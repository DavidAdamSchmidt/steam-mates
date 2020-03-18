using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Models.GameDetails;
using SteamMates.Services.Interfaces;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SteamMates.Services.Implementations
{
    public class GameService : IGameService
    {
        private readonly IRemoteApiService _remoteApiService;
        private readonly IDatabaseService _databaseService;
        private readonly IOptions<AppSecrets> _secrets;
        private readonly IMemoryCache _cache;

        public GameService(
            IRemoteApiService remoteApiService, IDatabaseService databaseService,
            IOptions<AppSecrets> secrets, IMemoryCache cache)
        {
            _databaseService = databaseService;
            _remoteApiService = remoteApiService;
            _secrets = secrets;
            _cache = cache;
        }

        public async Task<GameInfo> GetGameAsync(ISet<string> userIds, int gameId)
        {
            var url = SteamUtils.GetGameUrl(gameId);
            var jsonObj = await _remoteApiService.GetJsonObjectAsync(url, SteamUtils.ApiName);

            var game = jsonObj[gameId.ToString()]["data"]?.ToObject<GameInfo>()
                       ?? throw new GameNotFoundException($"Game {gameId} could not be found.", gameId);

            game.UserInfo = await GetUserInfoAsync(userIds, gameId);

            return game;
        }

        public async Task<GameCollectionForSingleUser> GetGamesAsync(string userId)
        {
            var library = await GetGameLibraryAsync(userId);

            var tagCollection = await GetTagCollectionAsync();

            return new GameCollectionForSingleUser
            {
                Games = await GetGameStatsForSingleUserAsync(userId, library, tagCollection),
                LatestUpdates = GetLatestUpdates(new[] { library }, tagCollection.LatestUpdate)
            };
        }

        public async Task<GameCollectionForMultipleUsers> GetGamesInCommonAsync(ISet<string> userIds)
        {
            var libraries = await GetGameLibrariesAsync(userIds);

            var tagCollection = await GetTagCollectionAsync();

            return new GameCollectionForMultipleUsers
            {
                Games = await GetGameStatsForMultipleUsersAsync(userIds, libraries, tagCollection),
                LatestUpdates = GetLatestUpdates(libraries, tagCollection.LatestUpdate)
            };
        }

        public async Task<bool> RateGameAsync(RatedGame ratedGame)
        {
            return await TryAccessDatabase(async () =>
            {
                var rating = await _databaseService.FindRatingAsync(ratedGame.UserId, ratedGame.GameId);

                if (rating != null)
                {
                    await _databaseService.UpdateRatingAsync(rating, ratedGame.Rating);

                    return false;
                }

                await _databaseService.AddRatingAsync(ratedGame);

                return true;
            });
        }

        public async Task<bool> UserHasGameAsync(string userId, int gameId)
        {
            var library = await GetGameLibraryAsync(userId);

            return library.Games
                .Select(x => x.AppId)
                .Contains(gameId);
        }

        private async Task<List<UserInfo>> GetUserInfoAsync(IEnumerable<string> userIds, int gameId)
        {
            var ratings = await TryAccessDatabase(async () =>
                await _databaseService.FindRatedGamesAsync(userIds, new[] { gameId }));

            return (
                await Task.WhenAll(
                    userIds.Select(async userId => await CreateUserInfoAsync(ratings, userId, gameId)))
            ).ToList();
        }

        private async Task<UserInfo> CreateUserInfoAsync(IEnumerable<RatedGame> ratings, string userId, int gameId)
        {
            var userInfo = new UserInfo
            {
                Id = userId,
                Rating = ratings.FirstOrDefault(x => x.UserId == userId)?.Rating
            };

            if (userInfo.Rating == null)
            {
                userInfo.HasGame = await UserHasGameAsync(userId, gameId);
            }

            return userInfo;
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
            return await _cache.GetOrCreate(userId, async entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                return await FetchGameLibraryAsync(userId);
            });
        }

        private async Task<GameLibrary> FetchGameLibraryAsync(string userId)
        {
            var url = SteamUtils.GetOwnedGamesUrl(_secrets.Value.SteamApiKey, userId);
            var jsonObj = await _remoteApiService.GetJsonObjectAsync(url, SteamUtils.ApiName);

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

        private async Task<TagCollection> GetTagCollectionAsync()
        {
            try
            {
                return await GetGameIdsByTagsAsync(false);
            }
            catch (Exception e) when (
                e is TagUnavailableException ||
                e is ApiUnavailableException ||
                e is JsonReaderException)
            {
                return await GetGameIdsByTagsAsync(true);
            }
        }

        private async Task<TagCollection> GetGameIdsByTagsAsync(bool useBackup)
        {
            if (useBackup)
            {
                return await CreateTagCollectionAsync(GetGameIdsByTagFromBackupAsync, true);
            }

            return await _cache.GetOrCreate(SiteUtils.CacheKeys.Tags, async entry =>
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

            return await _remoteApiService.GetJsonObjectAsync(url, SteamSpyUtils.ApiName);
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

        private async Task<List<GameStatForSingleUser>> GetGameStatsForSingleUserAsync(
            string userId, GameLibrary library, TagCollection tagCollection)
        {
            var stats = FilterLibrary(library, tagCollection).ToList();
            var gameIds = stats.Select(x => x.Game.AppId);
            var ratings = await TryAccessDatabase(async () =>
                await _databaseService.FindRatedGamesAsync(new[] { userId }, gameIds));

            foreach (var stat in stats)
            {
                stat.Rating = ratings
                    .Where(x => x.GameId == stat.Game.AppId)
                    .Select(x => x.Rating)
                    .FirstOrDefault();
            }

            stats.Sort();

            return stats;
        }

        private async Task<List<GameStatForMultipleUsers>> GetGameStatsForMultipleUsersAsync(
            IEnumerable<string> userIds, List<GameLibrary> libraries, TagCollection tagCollection)
        {
            var stats = FilterLibraries(libraries, tagCollection).ToList();
            var gameIds = stats.Select(x => x.Game.AppId);
            var ratings = await TryAccessDatabase(async () =>
                await _databaseService.FindRatedGamesAsync(userIds, gameIds));

            foreach (var stat in stats)
            {
                stat.Ratings = ratings.Where(x => x.GameId == stat.Game.AppId).ToList();
            }

            return stats;
        }

        private IEnumerable<GameStatForSingleUser> FilterLibrary(GameLibrary library, TagCollection tagCollection)
        {
            return
                from game in library.Games
                let tags = GetTags(game.AppId, tagCollection)
                where tags.Count > 0
                select new GameStatForSingleUser
                {
                    Game = game,
                    PlayTime = game.PlayTime,
                    Tags = tags
                };
        }

        private IEnumerable<GameStatForMultipleUsers> FilterLibraries(
            List<GameLibrary> libraries, TagCollection tagCollection)
        {
            // checking games of the smallest library

            libraries.Sort();

            return
                from game in libraries[0].Games
                let playTimes = GetPlayTimes(game.AppId, libraries)
                let tags = GetTags(game.AppId, tagCollection)
                where !playTimes.ContainsValue(null) && tags.Count > 0
                select new GameStatForMultipleUsers
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

        private async Task<T> TryAccessDatabase<T>(Func<Task<T>> accessDatabase)
        {
            try
            {
                return await accessDatabase();
            }
            catch (Exception e) when (
                e is DbUpdateException ||
                e is SqlException)
            {
                throw new DatabaseException("There was an error while interacting with the database.", e);
            }
        }
    }
}
