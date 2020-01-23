using Microsoft.Extensions.Options;
using SteamMates.Models;
using SteamMates.Utils;
using System.Collections.Generic;
using System.Linq;

namespace SteamMates.Services
{
    public class GameService : ServiceBase
    {
        public GameService(IOptions<AppSecrets> secrets)
            : base(secrets)
        {
        }

        public List<Game> GetGamesInCommon(ICollection<string> userIds)
        {
            var libraries = GetGameLibraries(userIds);
            var filteredGames = GetFilteredLibraries(libraries);

            return filteredGames;
        }

        private List<Game> GetFilteredLibraries(List<GameLibrary> libraries)
        {
            var filteredGames = new List<Game>();

            libraries.Sort();

            foreach (var gameA in libraries[0].Games)
            {
                var hasGame = true;

                for (var i = 1; i < libraries.Count; i++)
                {
                    hasGame = libraries[i].Games.Any(game => game.AppId == gameA.AppId);

                    if (!hasGame)
                    {
                        break;
                    }
                }

                if (hasGame)
                {
                    filteredGames.Add(gameA);
                }
            }
            filteredGames.Sort();

            return filteredGames;
        }

        private List<GameLibrary> GetGameLibraries(IEnumerable<string> userIds)
        {
            return userIds.Select(GetGameLibrary).ToList();
        }

        private GameLibrary GetGameLibrary(string userId)
        {
            var jsonObj = GetJsonObject(GetOwnedGamesUrl, userId);
            
            var games = jsonObj["response"]["games"]
                ?.Children()
                .Select(token => token.ToObject<Game>())
                .ToList();

            return new GameLibrary
            {
                UserId = userId,
                Games = games
            };
        }

        private string GetOwnedGamesUrl(string userId)
        {
            return string.Format(SteamApi.OwnedGamesPattern, Secrets.Value.SteamApiKey, userId);
        }
    }
}
