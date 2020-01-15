using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace SteamMates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
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
    }
}
