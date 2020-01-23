using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using SteamMates.Models;
using SteamMates.Services;
using SteamMates.Utils;

namespace SteamMates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
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

            SteamApi.SetUserIdFromClaim(User);

            var user = _userService.GetUserInfo(SteamApi.UserId);

            if (user.CommunityVisibilityState == 3)
            {
                user.Friends = _userService.GetFriends(SteamApi.UserId);
            }

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
