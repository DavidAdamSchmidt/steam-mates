using SteamMates.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SteamMates.Services.Interfaces
{
    public interface IGameService
    {
        Task<GameCollectionForSingleUser> GetGamesAsync(string userId);

        Task<GameCollectionForMultipleUsers> GetGamesInCommonAsync(ISet<string> userIds);

        Task<bool> RateGameAsync(RatedGame ratedGame);

        Task<bool> UserHasGameAsync(string userId, int gameId);
    }
}
