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
            var key = SiteUtils.CacheKeys.UserInfo;

            do
            {
                user = Cache.GetOrCreate(key, entry =>
                {
                    entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                    return FetchUserInfo(userId);
                });

                if (userId != user.SteamId)
                {
                    Cache.Remove(key);
                }
            } while (userId != user.SteamId);

            return user;
        }

        private User FetchUserInfo(string userId)
        {
            var url = SteamUtils.GetUserInfoUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);
            var token = jsonObj["response"]["players"].First;
            var user = token.ToObject<User>();

            if (user.CommunityVisibilityState == 3)
            {
                user.Friends = FetchFriends(userId);
            }

            user.LatestUpdate = DateTime.Now;

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
            var url = SteamUtils.GetFriendIdsUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url);

            return jsonObj["friendslist"]["friends"]
                .Children()
                .Select(token => token["steamid"].ToObject<string>());
        }

        private List<User> FetchFriendDetails(IEnumerable<string> ids)
        {
            var url = SteamUtils.GetFriendListUrl(Secrets.Value.SteamApiKey, ids);
            var jsonObj = GetJsonObject(url);

            return jsonObj["response"]["players"]
                .Children()
                .Select(token => token.ToObject<User>())
                .ToList();
        }
    }
}
