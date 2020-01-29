using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using SteamMates.Models;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SteamMates.Services
{
    public class UserService : ServiceBase
    {
        public UserService(IOptions<AppSecrets> secrets, IMemoryCache cache)
            : base(secrets, cache)
        {
        }

        public User GetUserInfo(string userId)
        {
            User user;

            do
            {
                user = Cache.GetOrCreate("user", entry =>
                {
                    entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                    return FetchUserInfo(userId);
                });

                if (userId != user.SteamId)
                {
                    Cache.Remove("user");
                }
            } while (userId != user.SteamId);

            return user;
        }

        private User FetchUserInfo(string userId)
        {
            var url = SteamApi.GetUserInfoUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);
            var token = jsonObj["response"]["players"].First;
            var user = token.ToObject<User>();

            if (user.CommunityVisibilityState == 3)
            {
                user.Friends = FetchFriends(userId);
            }

            return user;
        }

        private IList<User> FetchFriends(string userId)
        {
            var ids = FetchFriendIds(userId);

            var friends = FetchFriendDetails(ids);
            friends.Sort();

            return friends;
        }

        private IEnumerable<string> FetchFriendIds(string userId)
        {
            var url = SteamApi.GetFriendIdsUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);

            return jsonObj["friendslist"]["friends"]
                .Children()
                .Select(token => token["steamid"].ToObject<string>());
        }

        private List<User> FetchFriendDetails(IEnumerable<string> ids)
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
