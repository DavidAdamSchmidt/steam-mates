using Microsoft.Extensions.Options;
using SteamMates.Models;
using SteamMates.Utils;
using System.Collections.Generic;
using System.Linq;

namespace SteamMates.Services
{
    public class UserService : ServiceBase
    {
        public UserService(IOptions<AppSecrets> secrets)
            : base(secrets)
        {
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

            var friends = GetFriendList(ids);
            friends.Sort();

            return friends;
        }

        private IEnumerable<string> GetFriendIds(string userId)
        {
            var jsonObj = GetJsonObject(GetFriendIdsUrl, userId);

            return jsonObj["friendslist"]["friends"]
                .Children()
                .Select(token => token["steamid"].ToObject<string>());
        }

        private List<User> GetFriendList(IEnumerable<string> ids)
        {
            var jsonObj = GetJsonObject(GetFriendListUrl, ids);

            return jsonObj["response"]["players"]
                .Children()
                .Select(token => token.ToObject<User>())
                .ToList();
        }

        private string GetUserInfoUrl(string userId)
        {
            return string.Format(SteamApi.PlayerSummariesPattern, Secrets.Value.SteamApiKey, userId);
        }

        private string GetFriendIdsUrl(string userId)
        {
            return string.Format(SteamApi.FriendIdsPattern, Secrets.Value.SteamApiKey, userId);
        }

        private string GetFriendListUrl(IEnumerable<string> ids)
        {
            var joinedIds = string.Join(",", ids);

            return string.Format(SteamApi.PlayerSummariesPattern, Secrets.Value.SteamApiKey, joinedIds);
        }
    }
}
