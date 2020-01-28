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

            return GetFilteredLibraries(libraries).ToList();
        }

        private IEnumerable<GameStat> GetFilteredLibraries(IList<GameLibrary> libraries)
        {
            return
                from game in libraries[0].Games
                let playTimes = GetPlayTimes(libraries, game.AppId)
                where !playTimes.ContainsValue(null)
                select new GameStat(game, ConvertToPlayTimeList(playTimes));
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
    }
}
