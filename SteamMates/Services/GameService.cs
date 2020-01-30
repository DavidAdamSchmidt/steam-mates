using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;

namespace SteamMates.Services
{
    public class GameService : ServiceBase
    {
        public GameService(IOptions<AppSecrets> secrets, IMemoryCache cache)
            : base(secrets, cache)
        {
        }

        public GameCollection GetGamesInCommon(ICollection<string> userIds)
        {
            var libraries = GetGameLibraries(userIds);

            libraries.Sort();

            var tagCollection = GetGameIdsByTags();

            return new GameCollection
            {
                Games = FilterLibraries(libraries, tagCollection).ToList(),
                LatestUpdates = GetLatestUpdates(libraries, tagCollection.LatestUpdate)
            };
        }

        private List<GameLibrary> GetGameLibraries(IEnumerable<string> userIds)
        {
            return userIds
                .Select(id => Cache.GetOrCreate(id, entry =>
                {
                    entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                    return FetchGameLibrary(id);
                }))
                .ToList();
        }

        private GameLibrary FetchGameLibrary(string userId)
        {
            var url = SteamUtils.GetOwnedGamesUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);

            var games = jsonObj["response"]["games"]
                ?.Children()
                .Select(token => token.ToObject<PlayedGame>())
                .ToList();

            if (games == null)
            {
                throw new LibraryUnavailableException(userId);
            }

            return new GameLibrary
            {
                UserId = userId,
                Games = games,
                LatestUpdate = DateTime.Now
            };
        }

        private TagCollection GetGameIdsByTags()
        {
            return Cache.GetOrCreate(SiteUtils.CacheKeys.Tags, entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromHours(6));

                return FetchGameIdsByTags();
            });
        }

        private TagCollection FetchGameIdsByTags()
        {
            return new TagCollection
            {
                GameIdsByTags = SteamSpyApi.Tags.ToDictionary(tag => tag, FetchGameIdsByTag),
                LatestUpdate = DateTime.Now
            };
        }

        private List<int> FetchGameIdsByTag(string tag)
        {
            var url = SteamSpyApi.GetGamesByTagUrl(tag);
            var jsonObj = GetJsonObject(url);

            return jsonObj.ToObject<Dictionary<int, object>>().Keys.ToList();
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

        private Dictionary<string, DateTime> GetLatestUpdates(IEnumerable<GameLibrary> libraries, DateTime tagUpdate)
        {
            var dict = libraries.ToDictionary(x => x.UserId, x => x.LatestUpdate);

            dict.Add("tags", tagUpdate);

            return dict;
        }
    }
}
