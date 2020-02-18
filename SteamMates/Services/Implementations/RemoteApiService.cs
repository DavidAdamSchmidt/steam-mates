using Newtonsoft.Json.Linq;
using SteamMates.Exceptions;
using SteamMates.Services.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;

namespace SteamMates.Services.Implementations
{
    public class RemoteApiService : IRemoteApiService
    {
        public async Task<JObject> GetJsonObjectAsync(string url, string apiName)
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
