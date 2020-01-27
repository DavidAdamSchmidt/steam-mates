using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Net;

namespace SteamMates.Services
{
    public class ServiceBase
    {
        public ServiceBase(IOptions<AppSecrets> secrets)
        {
            Secrets = secrets;
        }

        protected IOptions<AppSecrets> Secrets { get; }

        protected static string GetJsonStringFromSteam<T>(Func<T, string> getUrl, T arg)
        {
            using var client = new WebClient();
            var endpoint = getUrl(arg);

            return client.DownloadString(endpoint);
        }

        protected static JObject GetJsonObject<T>(Func<T, string> getJsonStr, T arg)
        {
            var jsonStr = GetJsonStringFromSteam(getJsonStr, arg);

            return JObject.Parse(jsonStr);
        }
    }
}
