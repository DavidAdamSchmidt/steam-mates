using Microsoft.AspNetCore.Mvc;
using SteamMates.Models;
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
        public ActionResult<List<GameStat>> GetGamesInCommon([FromQuery(Name = "userId")] ICollection<string> userIds)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User needs to be authenticated.");
            }

            if (userIds.Count == 0)
            {
                return BadRequest("No user ID was received.");
            }

            var tooManyIds = BadRequest("Too many user IDs were received.");

            if (userIds.Count > 4)
            {
                return tooManyIds;
            }

            if (!userIds.Contains(SteamApi.UserId))
            {
                if (userIds.Count > 3)
                {
                    return tooManyIds;
                }

                userIds.Add(SteamApi.UserId);
            }

            return _gameService.GetGamesInCommon(userIds);
        }
    }
}
