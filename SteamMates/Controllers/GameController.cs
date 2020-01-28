using Microsoft.AspNetCore.Mvc;
using SteamMates.Models;
using SteamMates.Services;
using SteamMates.Utils;
using System.Collections.Generic;
using System.Linq;

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
        public ActionResult<List<GameStat>> GetGamesInCommon(
            [FromQuery(Name = "userId")] HashSet<string> userIds,
            [FromQuery(Name = "tag")] HashSet<string> tags)
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

            if (tags.Count == 0)
            {
                return BadRequest("No tag was received.");
            }

            var incorrectTags = tags.Where(tag => SteamSpyApi.Tags.All(correctTag => tag != correctTag)).ToArray();

            if (incorrectTags.Length > 0)
            {
                var joinedTags = string.Join(", ", incorrectTags);
                var grammarDiff = incorrectTags.Length == 1 ? " was" : "s were";

                return BadRequest($"Incorrect tag{grammarDiff} received: {joinedTags}");
            }

            if (!userIds.Contains(SteamApi.UserId))
            {
                if (userIds.Count > 3)
                {
                    return tooManyIds;
                }

                userIds.Add(SteamApi.UserId);
            }

            return _gameService.GetGamesInCommon(userIds, tags);
        }
    }
}
