using Microsoft.AspNetCore.Mvc;
using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Services;
using SteamMates.Utils;
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

        public GameController(GameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGamesAsync()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User needs to be authenticated.");
            }

            var userId = SteamUtils.GetUserIdFromClaim(User);

            return await ProduceResponseAsync(
                async () => await _gameService.GetGamesAsync(userId));
        }

        [HttpGet("common")]
        public async Task<IActionResult> GetGamesInCommonAsync([FromQuery(Name = "userId")] HashSet<string> userIds)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User needs to be authenticated.");
            }

            if (userIds.Count == 0)
            {
                return BadRequest("No user ID was received.");
            }

            var userId = SteamUtils.GetUserIdFromClaim(User);
            userIds.Add(userId);

            if (userIds.Count > 4)
            {
                return BadRequest("Too many user IDs were received.");
            }

            return await ProduceResponseAsync(
                async () => await _gameService.GetGamesInCommonAsync(userIds));
        }

        [HttpPut("rate")]
        public async Task<IActionResult> RateGameAsync(RatedGame ratedGame)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User needs to be authenticated.");
            }

            if (ratedGame.UserId != SteamUtils.GetUserIdFromClaim(User))
            {
                return BadRequest("Wrong user ID was received.");
            }

            if (ratedGame.Rating < 1 || ratedGame.Rating > 5)
            {
                return BadRequest($"Rating value {ratedGame.Rating} is invalid (needs to be between 1 and 5).");
            }

            bool hasGame;
            try
            {
                hasGame = await _gameService.UserHasGameAsync(ratedGame.UserId, ratedGame.GameId);
            }
            catch (Exception e) when (
                e is LibraryUnavailableException ||
                e is ApiUnavailableException)
            {
                var error = new
                {
                    Message = "Could not determine whether the user has the game or not. Please try again later.",
                    Reason = e.Message
                };

                return StatusCode(503, error);
            }

            if (!hasGame)
            {
                return BadRequest($"User does not have game {ratedGame.GameId} in their library.");
            }

            var created = await _gameService.RateGameAsync(ratedGame);

            if (created)
            {
                return StatusCode(201, ratedGame);
            }

            return NoContent();
        }

        private async Task<IActionResult> ProduceResponseAsync(Func<Task<GameCollection>> dataRetrieval)
        {
            try
            {
                var games = await dataRetrieval();

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
