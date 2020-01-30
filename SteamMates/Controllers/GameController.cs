using Microsoft.AspNetCore.Mvc;
using SteamMates.Models;
using SteamMates.Services;
using System.Collections.Generic;
using SteamMates.Utils;

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
        public ActionResult<GameCollection> GetGamesInCommon([FromQuery(Name = "userId")] HashSet<string> userIds)
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

            return _gameService.GetGamesInCommon(userIds);
        }
    }
}
