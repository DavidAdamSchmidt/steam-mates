using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace SteamMates.Utils
{
    public class UserManager
    {
        public string GetUserId(ClaimsPrincipal user)
        {
            var claim = user.Claims.ToArray()[0].Value;
            var pattern = @"^https?://steamcommunity\.com/openid/id/(7[0-9]{15,25})$";

            var match = Regex.Match(claim, pattern);

            return match.Groups[1].Value;
        }
    }
}
