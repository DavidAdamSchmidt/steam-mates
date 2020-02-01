using Microsoft.AspNetCore.Mvc;
using SteamMates.Exceptions;
using SteamMates.Services;
using SteamMates.Utils;
using System.Collections.Generic;

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

        [HttpGet("common")]
        public IActionResult GetGamesInCommon([FromQuery(Name = "userId")] HashSet<string> userIds)
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

            try
            {
                var games = _gameService.GetGamesInCommon(userIds);

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
