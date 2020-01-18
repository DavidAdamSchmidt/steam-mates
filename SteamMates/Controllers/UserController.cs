using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using SteamMates.Models;
using SteamMates.Utils;

namespace SteamMates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager _userManager;

        public UserController(UserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("auth")]
        public IActionResult Authenticate()
        {
            if (User.Identity.IsAuthenticated)
            {
                return BadRequest("User has already been authenticated.");
            }

            var referer = Request.Headers["Referer"].ToString();
            var properties = new AuthenticationProperties { RedirectUri = referer };

            return Challenge(properties, "Steam");
        }

        [HttpGet("info")]
        public ActionResult<User> GetUserInfo()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User has not yet been authenticated.");
            }

            var userId = _userManager.GetUserId(User);
            var user = _userManager.GetUserInfo(userId);
            var friends = _userManager.GetFriends(userId); // TODO: send to client

            return user;
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("SteamMates_user");

            return NoContent();
        }
    }
}
