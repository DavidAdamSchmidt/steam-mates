using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace SteamMates.Utils
{
    public static class SteamUtils
    {
        private const string PlayerSummariesPattern =
            @"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={0}&steamids={1}";

        private const string FriendIdsPattern =
            @"http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key={0}&steamid={1}&relationship=friend";

        private const string OwnedGamesPattern =
            @"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={0}&steamid={1}&include_appinfo=true&include_played_free_games=true";

        public static string UserId { get; private set; }

        public static string GetUserInfoUrl(string apiKey, string userId)
        {
            return string.Format(PlayerSummariesPattern, apiKey, userId);
        }

        public static string GetFriendIdsUrl(string apiKey, string userId)
        {
            return string.Format(FriendIdsPattern, apiKey, userId);
        }

        public static string GetFriendListUrl(string apiKey, IEnumerable<string> ids)
        {
            var joinedIds = string.Join(",", ids);

            return string.Format(PlayerSummariesPattern, apiKey, joinedIds);
        }

        public static string GetOwnedGamesUrl(string apiKey, string userId)
        {
            return string.Format(OwnedGamesPattern, apiKey, userId);
        }

        public static void SetUserIdFromClaim(ClaimsPrincipal user)
        {
            var claim = user.Claims.ToArray()[0].Value;
            const string pattern = @"^https?://steamcommunity.com/openid/id/(7[0-9]{15,25})$";

            UserId = GetRegexMatch(claim, pattern);
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
