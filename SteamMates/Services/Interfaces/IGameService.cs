using SteamMates.Models;
using SteamMates.Models.GameDetails;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SteamMates.Services.Interfaces
{
    public interface IGameService
    {
        Task<GameInfo> GetGameAsync(int gameId);

        Task<GameCollectionForSingleUser> GetGamesAsync(string userId);

        Task<GameCollectionForMultipleUsers> GetGamesInCommonAsync(ISet<string> userIds);

        Task<bool> RateGameAsync(RatedGame ratedGame);

        Task<bool> UserHasGameAsync(string userId, int gameId);
    }
}
