using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Services.Interfaces;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SteamMates.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IRemoteApiService _remoteApiService;
        private readonly IOptions<AppSecrets> _secrets;
        private readonly IMemoryCache _cache;

        public UserService(IRemoteApiService remoteApiService, IOptions<AppSecrets> secrets, IMemoryCache cache)
        {
            _remoteApiService = remoteApiService;
            _secrets = secrets;
            _cache = cache;
        }

        public async Task<User> GetUserInfoAsync(string userId)
        {
            User user;
            var key = SiteUtils.CacheKeys.UserInfo;

            do
            {
                user = await _cache.GetOrCreate(key, async entry =>
                {
                    entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                    return await FetchUserInfoAsync(userId);
                });

                if (userId != user.SteamId)
                {
                    _cache.Remove(key);
                }
            } while (userId != user.SteamId);

            return user;
        }

        private async Task<User> FetchUserInfoAsync(string userId)
        {
            var url = SteamUtils.GetUserInfoUrl(_secrets.Value.SteamApiKey, userId);
            var jsonObj = await _remoteApiService.GetJsonObjectAsync(url, SteamUtils.ApiName);
            var token = jsonObj["response"]["players"].First;
            var user = token.ToObject<User>();

            if (user.CommunityVisibilityState == 3)
            {
                try
                {
                    user.Friends = await FetchFriendsAsync(userId);
                }
                catch (ApiUnavailableException)
                {
                    var key = SiteUtils.CacheKeys.UserInfo;

                    _cache.Remove(key);

                    throw;
                }
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
            var url = SteamUtils.GetFriendIdsUrl(_secrets.Value.SteamApiKey, userId);
            var jsonObj = await _remoteApiService.GetJsonObjectAsync(url, SteamUtils.ApiName);

            return jsonObj["friendslist"]["friends"]
                .Children()
                .Select(token => token["steamid"].ToObject<string>());
        }

        private async Task<List<User>> FetchFriendDetailsAsync(IEnumerable<string> ids)
        {
            var url = SteamUtils.GetFriendListUrl(_secrets.Value.SteamApiKey, ids);
            var jsonObj = await _remoteApiService.GetJsonObjectAsync(url, SteamUtils.ApiName);

            return jsonObj["response"]["players"]
                .Children()
                .Select(token => token.ToObject<User>())
                .ToList();
        }
    }
}
