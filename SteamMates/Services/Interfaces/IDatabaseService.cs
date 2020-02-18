using SteamMates.Models;
using SteamMates.Models.Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SteamMates.Services.Interfaces
{
    public interface IDatabaseService
    {
        Task AddRatingAsync(RatedGame ratedGame);

        Task UpdateRatingAsync(Rating rating, int newValue);

        Task<Rating> FindRatingAsync(string userId, int gameId);

        Task<List<RatedGame>> FindRatedGamesAsync(IEnumerable<string> userIds, IEnumerable<int> gameIds);
    }
}
