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
        public GameService(IOptions<AppSecrets> secrets)
            : base(secrets)
        {
        }

        public List<GameStat> GetGamesInCommon(ICollection<string> userIds)
        {
            var libraries = GetGameLibraries(userIds);

            libraries.Sort();

            return FilterLibraries(libraries).ToList();
        }

        private IEnumerable<GameStat> FilterLibraries(IList<GameLibrary> libraries)
        {
            var idsByTags = GetGameIdsByTags();

            return OrganizeData(libraries, idsByTags).Where(stat => stat.Tags.Count > 0);
        }

        private IEnumerable<GameStat> OrganizeData(IList<GameLibrary> libraries, Dictionary<string, List<int>> idsByTags)
        {
            return
                from game in libraries[0].Games
                let playTimes = GetPlayTimes(libraries, game.AppId)
                where !playTimes.ContainsValue(null)
                select new GameStat
                {
                    Game = game,
                    PlayTimes = ConvertToPlayTimeList(playTimes),
                    Tags = GetTagsByGameId(game.AppId, idsByTags)
                };
        }

        private ImmutableSortedDictionary<string, int?> GetPlayTimes(IEnumerable<GameLibrary> libraries, int gameId)
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

        private List<GameLibrary> GetGameLibraries(IEnumerable<string> userIds)
        {
            return userIds.Select(GetGameLibrary).ToList();
        }

        private GameLibrary GetGameLibrary(string userId)
        {
            var url = SteamApi.GetOwnedGamesUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);

            var games = jsonObj["response"]["games"]
                ?.Children()
                .Select(token => token.ToObject<PlayedGame>())
                .ToList();

            return new GameLibrary(userId, games ?? new List<PlayedGame>());
        }

        private Dictionary<string, List<int>> GetGameIdsByTags()
        {
            return SteamSpyApi.Tags.ToDictionary(tag => tag, GetGameIdsByTag);
        }

        private List<int> GetGameIdsByTag(string tag)
        {
            var url = SteamSpyApi.GetGamesByTagUrl(tag);
            var jsonObj = GetJsonObject(url);

            return jsonObj.ToObject<Dictionary<int, object>>().Keys.ToList();
        }

        private List<string> GetTagsByGameId(int gameId, Dictionary<string, List<int>> idsByTags)
        {
            return
                (from pair in idsByTags
                 where pair.Value.Any(id => id == gameId)
                 select pair.Key)
                .ToList();
        }
    }
}
