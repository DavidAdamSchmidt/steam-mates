using Newtonsoft.Json;

namespace SteamMates.Models
{
    public class User
    {
        public string SteamId { get; set; }

        [JsonProperty("personaname")]
        public string Name { get; set; }

        [JsonProperty("avatarfull")]
        public string Avatar { get; set; }
    }
}
