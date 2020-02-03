using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SteamMates.Exceptions;
using SteamMates.Models;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;

namespace SteamMates.Services
{
    public class GameService : ServiceBase
    {
        public GameService(IOptions<AppSecrets> secrets, IMemoryCache cache)
            : base(secrets, cache)
        {
        }

        public GameCollection GetGamesInCommon(ICollection<string> userIds)
        {
            var libraries = GetGameLibraries(userIds);

            libraries.Sort();

            TagCollection tagCollection;
            try
            {
                tagCollection = GetGameIdsByTags(false);
            }
            catch (Exception e) when (
                e is TagUnavailableException ||
                e is ApiUnavailableException ||
                e is JsonReaderException)
            {
                tagCollection = GetGameIdsByTags(true);
            }

            return new GameCollection
            {
                Games = FilterLibraries(libraries, tagCollection).ToList(),
                LatestUpdates = GetLatestUpdates(libraries, tagCollection.LatestUpdate)
            };
        }

        private List<GameLibrary> GetGameLibraries(IEnumerable<string> userIds)
        {
            return userIds
                .Select(id => Cache.GetOrCreate(id, entry =>
                {
                    entry.SetAbsoluteExpiration(TimeSpan.FromHours(1));

                    return FetchGameLibrary(id);
                }))
                .ToList();
        }

        private GameLibrary FetchGameLibrary(string userId)
        {
            var url = SteamUtils.GetOwnedGamesUrl(Secrets.Value.SteamApiKey, userId);
            var jsonObj = GetJsonObject(url, SteamUtils.ApiName);

            var games = jsonObj["response"]["games"]
                ?.Children()
                .Select(token => token.ToObject<PlayedGame>())
                .ToList();

            if (games == null)
            {
                throw new LibraryUnavailableException("Could not access library.", userId);
            }

            return new GameLibrary
            {
                UserId = userId,
                Games = games,
                LatestUpdate = DateTime.Now
            };
        }

        private TagCollection GetGameIdsByTags(bool useBackup)
        {
            if (useBackup)
            {
                return CreateTagCollection(GetGameIdsByTagFromBackup, true);
            }

            return Cache.GetOrCreate(SiteUtils.CacheKeys.Tags, entry =>
            {
                entry.SetAbsoluteExpiration(TimeSpan.FromHours(6));

                return CreateTagCollection(GetGameIdsByTagFromApi, false);
            });
        }

        private TagCollection CreateTagCollection(Func<string, JObject> getJsonObject, bool isBackupUsed)
        {
            var tagCollection = new TagCollection
            {
                GameIdsByTags = SteamSpyUtils.Tags.ToDictionary(tag => tag,
                    tag => GetGameIdsByTag(tag, getJsonObject, isBackupUsed))
            };

            if (!isBackupUsed)
            {
                tagCollection.LatestUpdate = DateTime.Now;
            }

            return tagCollection;
        }

        private JObject GetGameIdsByTagFromApi(string tag)
        {
            var url = SteamSpyUtils.GetGamesByTagUrl(tag);

            return GetJsonObject(url, SteamSpyUtils.ApiName);
        }

        private JObject GetGameIdsByTagFromBackup(string tag)
        {
            try
            {
                string jsonStr;
                using (var r = new StreamReader($"Backups/Tags/{tag}.json"))
                {
                    jsonStr = r.ReadToEnd();
                }

                return JObject.Parse(jsonStr);
            }
            catch (Exception e) when (
                e is FileNotFoundException ||
                e is DirectoryNotFoundException ||
                e is IOException ||
                e is JsonReaderException)
            {
                throw new TagUnavailableException(SteamSpyUtils.GetTagErrorMessage(true), tag, e);
            }
        }

        private List<int> GetGameIdsByTag(string tag, Func<string, JObject> getJsonObject, bool isBackupUsed)
        {
            var jsonObj = getJsonObject(tag);

            var gameIds = jsonObj.ToObject<Dictionary<int, object>>().Keys.ToList();

            if (gameIds.Count == 0)
            {
                throw new TagUnavailableException(SteamSpyUtils.GetTagErrorMessage(isBackupUsed), tag);
            }

            return gameIds;
        }

        private IEnumerable<GameStat> FilterLibraries(IList<GameLibrary> libraries, TagCollection tagCollection)
        {
            return
                from game in libraries[0].Games
                let playTimes = GetPlayTimes(game.AppId, libraries)
                let tags = GetTags(game.AppId, tagCollection)
                where !playTimes.ContainsValue(null) && tags.Count > 0
                select new GameStat
                {
                    Game = game,
                    PlayTimes = ConvertToPlayTimeList(playTimes),
                    Tags = tags
                };
        }

        private ImmutableSortedDictionary<string, int?> GetPlayTimes(int gameId, IEnumerable<GameLibrary> libraries)
        {
            return libraries.ToImmutableSortedDictionary(
                library => library.UserId,
                library => library.Games
                    .Find(game => game.AppId == gameId)?.PlayTime);
        }

        private List<PlayTimeInfo> ConvertToPlayTimeList(ImmutableSortedDictionary<string, int?> playTimes)
        {
            return playTimes
                .Select(pair => new PlayTimeInfo(pair.Key, Convert.ToInt32(pair.Value)))
                .ToList();
        }

        private List<string> GetTags(int gameId, TagCollection tagCollection)
        {
            return
                (from pair in tagCollection.GameIdsByTags
                 where pair.Value.Any(id => id == gameId)
                 select pair.Key)
                .ToList();
        }

        private Dictionary<string, DateTime?> GetLatestUpdates(IEnumerable<GameLibrary> libraries, DateTime? tagUpdate)
        {
            var dict = libraries.ToDictionary(x => x.UserId, x => x.LatestUpdate);

            dict.Add("tags", tagUpdate);

            return dict;
        }
    }
}
