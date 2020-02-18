using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using SteamMates.Exceptions;
using SteamMates.Services;
using SteamMates.Utils;
using SteamMates.Validation;
using System.Threading.Tasks;

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
                return BadRequest(ValidationError.AlreadyAuthenticated);
            }

            var referer = Request.Headers["Referer"].ToString();
            var properties = new AuthenticationProperties { RedirectUri = referer };

            return Challenge(properties, "Steam");
        }

        [HttpGet("info")]
        public async Task<IActionResult> GetUserInfoAsync()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized(ValidationError.Unauthorized);
            }

            var userId = SteamUtils.GetUserIdFromClaim(User);

            try
            {
                var user = await _userService.GetUserInfoAsync(userId);

                return Ok(user);
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
