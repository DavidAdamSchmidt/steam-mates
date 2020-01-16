using System.Linq;
using Microsoft.Extensions.Options;
using System.Net;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;
using SteamMates.Models;

namespace SteamMates.Utils
{
    public class UserManager
    {
        private readonly IOptions<AppSecrets> _secrets;

        public UserManager(IOptions<AppSecrets> secrets)
        {
            _secrets = secrets;
        }

        public string GetUserId(ClaimsPrincipal user)
        {
            var claim = user.Claims.ToArray()[0].Value;
            const string pattern = @"^https?://steamcommunity\.com/openid/id/(7[0-9]{15,25})$";

            var match = Regex.Match(claim, pattern);

            return match.Groups[1].Value;
        }

        public User GetUserInfo(string userId)
        {
            var jsonStr = GetUserInfoFromSteam(userId);

            var jsonObj = JObject.Parse(jsonStr);
            var token = jsonObj["response"]["players"].First;
            var user = token.ToObject<User>();

            return user;
        }

        private string GetUserInfoFromSteam(string userId)
        {
            using var client = new WebClient();
            var endpoint = GetUserInfoUrl(userId);

            return client.DownloadString(endpoint);
        }

        private string GetUserInfoUrl(string userId)
        {
            const string pattern = @"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={0}&steamids={1}";

            return string.Format(pattern, _secrets.Value.SteamApiKey, userId);
        }
    }
}
