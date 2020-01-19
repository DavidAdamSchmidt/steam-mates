using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using SteamMates.Models;
using SteamMates.Utils;

namespace SteamMates.Services
{
    public class UserService
    {

        private readonly IOptions<AppSecrets> _secrets;

        public UserService(IOptions<AppSecrets> secrets)
        {
            _secrets = secrets;
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
            return string.Format(SteamApi.PlayerSummariesPattern, _secrets.Value.SteamApiKey, userId);
        }

        private string GetFriendIdsUrl(string userId)
        {
            return string.Format(SteamApi.FriendIdsPattern, _secrets.Value.SteamApiKey, userId);
        }

        private string GetFriendsInfoUrl(IEnumerable<string> ids)
        {
            var joinedIds = string.Join(",", ids);

            return string.Format(SteamApi.PlayerSummariesPattern, _secrets.Value.SteamApiKey, joinedIds);
        }
    }
}
