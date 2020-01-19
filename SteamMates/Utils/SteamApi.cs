using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace SteamMates.Utils
{
    public static class SteamApi
    {
        private const string PlayerSummaries =
            @"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={0}&steamids={1}";

        private const string FriendIds =
            @"http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key={0}&steamid={1}&relationship=friend";

        public static string PlayerSummariesPattern => PlayerSummaries;

        public static string FriendIdsPattern => FriendIds;

        public static string GetUserIdFromClaim(ClaimsPrincipal user)
        {
            var claim = user.Claims.ToArray()[0].Value;
            const string pattern = @"^https?://steamcommunity.com/openid/id/(7[0-9]{15,25})$";

            return GetRegexMatch(claim, pattern);
        }

        public static string GetVanityIdFromProfileUrl(string profileUrl)
        {
            const string pattern = @"^https?://steamcommunity.com/id/([a-zA-Z0-9]+)";

            return GetRegexMatch(profileUrl, pattern);
        }

        private static string GetRegexMatch(string input, string pattern)
        {
            var match = Regex.Match(input, pattern);
            var result = match.Groups[1].Value;

            return string.IsNullOrEmpty(result) ? null : result;
        }
    }
}
