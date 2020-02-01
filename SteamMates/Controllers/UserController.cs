using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using SteamMates.Exceptions;
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

            var userId = SteamUtils.GetUserIdFromClaim(User);

            try
            {
                var user = _userService.GetUserInfo(userId);

                return user;
            }
            catch (ApiUnavailableException e)
            {
                return StatusCode(503, new { e.ApiName, e.Message });
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(SiteUtils.UserCookieName);

            return NoContent();
        }
    }
}
