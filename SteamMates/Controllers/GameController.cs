using Microsoft.AspNetCore.Mvc;

namespace SteamMates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        [HttpGet("common")]
        public IActionResult GetGamesInCommon([FromQuery(Name = "friendId")] string[] friendIds)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User needs to be authenticated.");
            }

            if (friendIds.Length == 0)
            {
                return BadRequest("No friend ID was received.");
            }

            if (friendIds.Length > 3)
            {
                return BadRequest("Too many friend IDs were received.");
            }

            return Ok(); // TODO: send back games
        }
    }
}
