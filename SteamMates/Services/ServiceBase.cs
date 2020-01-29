using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System.Net;

namespace SteamMates.Services
{
    public class ServiceBase
    {
        public ServiceBase(IOptions<AppSecrets> secrets, IMemoryCache cache)
        {
            Secrets = secrets;
            Cache = cache;
        }

        protected IOptions<AppSecrets> Secrets { get; }

        protected IMemoryCache Cache { get; }

        protected static JObject GetJsonObject(string url)
        {
            var jsonStr = GetJsonString(url);

            return JObject.Parse(jsonStr);
        }

        private static string GetJsonString(string url)
        {
            using var client = new WebClient();

            return client.DownloadString(url);
        }
    }
}
