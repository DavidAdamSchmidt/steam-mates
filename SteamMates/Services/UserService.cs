using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using SteamMates.Models;

namespace SteamMates.Services
{
    public class UserService
    {
        private const string PlayerSummariesPattern =
            @"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={0}&steamids={1}";

        private const string FriendIdsPattern =
            @"http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key={0}&steamid={1}&relationship=friend";

        private readonly IOptions<AppSecrets> _secrets;

        public UserService(IOptions<AppSecrets> secrets)
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
            var jsonObj = GetJsonObject(GetUserInfoUrl, userId);
            var token = jsonObj["response"]["players"].First;
            var user = token.ToObject<User>();

            return user;
        }

        public IList<User> GetFriends(string userId)
        {
            var ids = GetFriendIds(userId);

            return GetFriendsInfo(ids);
        }

        private static string GetJsonStringFromSteam<T>(Func<T, string> getUrl, T arg)
        {
            using var client = new WebClient();
            var endpoint = getUrl(arg);

            return client.DownloadString(endpoint);
        }

        private static JObject GetJsonObject<T>(Func<T, string> getJsonStr, T arg)
        {
            var jsonStr = GetJsonStringFromSteam(getJsonStr, arg);

            return JObject.Parse(jsonStr);
        }

        private IEnumerable<string> GetFriendIds(string userId)
        {
            var jsonObj = GetJsonObject(GetFriendIdsUrl, userId);

            return jsonObj["friendslist"]["friends"]
                .Children()
                .Select(token => token["steamid"].ToObject<string>());
        }

        private IList<User> GetFriendsInfo(IEnumerable<string> ids)
        {
            var jsonObj = GetJsonObject(GetFriendsInfoUrl, ids);

            return jsonObj["response"]["players"]
                .Children()
                .Select(token => token.ToObject<User>())
                .ToList();
        }

        private string GetUserInfoUrl(string userId)
        {
            return string.Format(PlayerSummariesPattern, _secrets.Value.SteamApiKey, userId);
        }

        private string GetFriendIdsUrl(string userId)
        {
            return string.Format(FriendIdsPattern, _secrets.Value.SteamApiKey, userId);
        }

        private string GetFriendsInfoUrl(IEnumerable<string> ids)
        {
            return string.Format(PlayerSummariesPattern, _secrets.Value.SteamApiKey, string.Join(",", ids));
        }
    }
}
