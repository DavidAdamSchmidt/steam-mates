using Newtonsoft.Json;

namespace SteamMates.Models.GameDetails
{
    public class Screenshot
    {
        public int Id { get; set; }

        [JsonProperty("path_thumbnail")]
        public string Thumbnail { get; set; }

        [JsonProperty("path_full")]
        public string Full { get; set; }
    }
}
