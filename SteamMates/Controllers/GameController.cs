using Microsoft.AspNetCore.Mvc;
using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Services;
using SteamMates.Utils;
using SteamMates.Validation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SteamMates.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameService _gameService;
        private readonly ValidationService _validationService;

        public GameController(GameService gameService, ValidationService validationService)
        {
            _gameService = gameService;
            _validationService = validationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGamesAsync()
        {
            var result = _validationService.ValidateGetGames(User);

            return await SendResponseAsync(result,
                async () => await TryRetrieveDataAsync(RetrieveGamesAsync));
        }

        [HttpGet("common")]
        public async Task<IActionResult> GetGamesInCommonAsync([FromQuery(Name = "userId")] HashSet<string> userIds)
        {
            var result = _validationService.ValidateGetGamesInCommon(User, userIds);

            return await SendResponseAsync(result,
                async () => await TryRetrieveDataAsync(
                    async () => await RetrieveGamesInCommonAsync(userIds)));
        }

        [HttpPut("rate")]
        public async Task<IActionResult> RateGameAsync(RatedGame ratedGame)
        {
            var result = await _validationService.ValidateRateGameAsync(User, ratedGame);

            return await SendResponseAsync(result,
                async () => await CreateOrUpdateRatingAsync(ratedGame));
        }

        private async Task<IActionResult> SendResponseAsync(
            ValidationResult validationResult, Func<Task<IActionResult>> onSuccess)
        {
            return validationResult.Status switch
            {
                ValidationStatus.Ok => await onSuccess(),
                ValidationStatus.Unauthorized => Unauthorized(validationResult.Message),
                ValidationStatus.Failed => BadRequest(validationResult.Message),
                ValidationStatus.Aborted => StatusCode(503, validationResult.Message),
                _ => throw new ArgumentException("Invalid validation status."),
            };
        }

        private async Task<GameCollection> RetrieveGamesAsync()
        {
            var userId = SteamUtils.GetUserIdFromClaim(User);

            return await _gameService.GetGamesAsync(userId);
        }

        private async Task<GameCollection> RetrieveGamesInCommonAsync(ISet<string> userIds)
        {
            var userId = SteamUtils.GetUserIdFromClaim(User);
            userIds.Add(userId);

            return await _gameService.GetGamesInCommonAsync(userIds);
        }

        private async Task<IActionResult> CreateOrUpdateRatingAsync(RatedGame ratedGame)
        {
            var created = await _gameService.RateGameAsync(ratedGame);

            if (created)
            {
                return StatusCode(201, ratedGame);
            }

            return NoContent();
        }

        private async Task<IActionResult> TryRetrieveDataAsync(Func<Task<GameCollection>> retrieveData)
        {
            try
            {
                var games = await retrieveData();

                return Ok(games);
            }
            catch (ApiUnavailableException e)
            {
                return StatusCode(503, new { e.Message, e.ApiName });
            }
            catch (LibraryUnavailableException e)
            {
                return NotFound(new { e.Message, e.UserId });
            }
            catch (TagUnavailableException e)
            {
                return NotFound(new { e.Message, e.TagName });
            }
        }
    }
}
