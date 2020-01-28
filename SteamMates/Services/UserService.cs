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
            var url = SteamApi.GetUserInfoUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);
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
            var url = SteamApi.GetFriendIdsUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);

            return jsonObj["friendslist"]["friends"]
                .Children()
                .Select(token => token["steamid"].ToObject<string>());
        }

        private List<User> GetFriendList(IEnumerable<string> ids)
        {
            var url = SteamApi.GetFriendListUrl(Secrets.Value.SteamApiKey, ids);
            var jsonObj = GetJsonObject(url);

            return jsonObj["response"]["players"]
                .Children()
                .Select(token => token.ToObject<User>())
                .ToList();
        }
    }
}
