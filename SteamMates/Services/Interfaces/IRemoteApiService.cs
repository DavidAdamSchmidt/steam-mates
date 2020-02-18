using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace SteamMates.Services.Interfaces
{
    public interface IRemoteApiService
    {
        Task<JObject> GetJsonObjectAsync(string url, string apiName);
    }
}
