using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
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

        public GameList GetGamesInCommon(ICollection<string> userIds)
        {
            var libraries = GetGameLibraries(userIds);

            libraries.Sort();

            var tags = GetGameIdsByTags();

            return GetGameList(libraries, tags);
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
            var url = SteamApi.GetOwnedGamesUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);

            var games = jsonObj["response"]["games"]
                ?.Children()
                .Select(token => token.ToObject<PlayedGame>())
                .ToList();

            return new GameLibrary
            {
                UserId = userId,
                Games = games ?? new List<PlayedGame>(),
                LatestUpdate = DateTime.Now
            };
        }

        private TagList GetGameIdsByTags()
        {
            return Cache.GetOrCreate("tags", entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromHours(6));

                return FetchGameIdsByTags();
            });
        }

        private TagList FetchGameIdsByTags()
        {
            return new TagList
            {
                Tags = SteamSpyApi.Tags.ToDictionary(tag => tag, FetchGameIdsByTag),
                LatestUpdate = DateTime.Now
            };
        }

        private List<int> FetchGameIdsByTag(string tag)
        {
            var url = SteamSpyApi.GetGamesByTagUrl(tag);
            var jsonObj = GetJsonObject(url);

            return jsonObj.ToObject<Dictionary<int, object>>().Keys.ToList();
        }

        private GameList GetGameList(IList<GameLibrary> libraries, TagList tagList)
        {
            return new GameList
            {
                Games = FilterLibraries(libraries, tagList).ToList(),
                LatestUpdates = GetLatestUpdates(libraries, tagList)
            };
        }

        private IEnumerable<GameStat> FilterLibraries(IList<GameLibrary> libraries, TagList idsByTags)
        {
            return
                from game in libraries[0].Games
                let playTimes = GetPlayTimes(game.AppId, libraries)
                let tags = GetTags(game.AppId, idsByTags)
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

        private List<string> GetTags(int gameId, TagList tagList)
        {
            return
                (from pair in tagList.Tags
                 where pair.Value.Any(id => id == gameId)
                 select pair.Key)
                .ToList();
        }

        private Dictionary<string, DateTime> GetLatestUpdates(IEnumerable<GameLibrary> libraries, TagList tagList)
        {
            var dict = libraries.ToDictionary(x => x.UserId, x => x.LatestUpdate);

            dict.Add("tags", tagList.LatestUpdate);

            return dict;
        }
    }
}
