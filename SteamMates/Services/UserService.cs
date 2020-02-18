using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using SteamMates.Models;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SteamMates.Services
{
    public class UserService : RemoteApiService
    {
        public UserService(IOptions<AppSecrets> secrets, IMemoryCache cache)
            : base(secrets, cache)
        {
        }

        public async Task<User> GetUserInfoAsync(string userId)
        {
            User user;
            var key = SiteUtils.CacheKeys.UserInfo;

            do
            {
                user = await Cache.GetOrCreate(key, async entry =>
                {
                    entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                    return await FetchUserInfoAsync(userId);
                });

                if (userId != user.SteamId)
                {
                    Cache.Remove(key);
                }
            } while (userId != user.SteamId);

            return user;
        }

        private async Task<User> FetchUserInfoAsync(string userId)
        {
            var url = SteamUtils.GetUserInfoUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = await GetJsonObject(url, SteamUtils.ApiName);
            var token = jsonObj["response"]["players"].First;
            var user = token.ToObject<User>();

            if (user.CommunityVisibilityState == 3)
            {
                user.Friends = await FetchFriendsAsync(userId);
            }

            user.LatestUpdate = DateTime.Now;

            return user;
        }

        private async Task<IList<User>> FetchFriendsAsync(string userId)
        {
            var ids = await FetchFriendIdsAsync(userId);

            var friends = await FetchFriendDetailsAsync(ids);
            friends.Sort();

            return friends;
        }

        private async Task<IEnumerable<string>> FetchFriendIdsAsync(string userId)
        {
            var url = SteamUtils.GetFriendIdsUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = await GetJsonObject(url, SteamUtils.ApiName);

            return jsonObj["friendslist"]["friends"]
                .Children()
                .Select(token => token["steamid"].ToObject<string>());
        }

        private async Task<List<User>> FetchFriendDetailsAsync(IEnumerable<string> ids)
        {
            var url = SteamUtils.GetFriendListUrl(Secrets.Value.SteamApiKey, ids);
            var jsonObj = await GetJsonObject(url, SteamUtils.ApiName);

            return jsonObj["response"]["players"]
                .Children()
                .Select(token => token.ToObject<User>())
                .ToList();
        }
    }
}
