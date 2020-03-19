using SteamMates.Models;
using SteamMates.Validation;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SteamMates.Services.Interfaces
{
    public interface IValidationService
    {
        ValidationResult ValidateGetGame(ClaimsPrincipal user, ISet<string> userIds, string gameId);

        ValidationResult ValidateGetGames(ClaimsPrincipal user);

        ValidationResult ValidateGetGamesInCommon(ClaimsPrincipal user, ISet<string> userIds);

        Task<ValidationResult> ValidateRateGameAsync(ClaimsPrincipal user, RatedGame ratedGame);
    }
}
