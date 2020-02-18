using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using SteamMates.Exceptions;
using System.Net.Http;
using System.Threading.Tasks;

namespace SteamMates.Services
{
    public class RemoteApiService
    {
        public RemoteApiService(IOptions<AppSecrets> secrets, IMemoryCache cache)
        {
            Secrets = secrets;
            Cache = cache;
        }

        protected IOptions<AppSecrets> Secrets { get; }

        protected IMemoryCache Cache { get; }

        public async Task<JObject> GetJsonObject(string url, string apiName)
        {
            string jsonStr;

            try
            {
                jsonStr = await GetStringAsync(url);
            }
            catch (HttpRequestException e)
            {
                var message = $"An error occured while trying to communicate with the {apiName} API.";

                throw new ApiUnavailableException(message, apiName, e);
            }

            return JObject.Parse(jsonStr);
        }

        private async Task<string> GetStringAsync(string url)
        {
            using var client = new HttpClient();

            return await client.GetStringAsync(url);
        }
    }
}
