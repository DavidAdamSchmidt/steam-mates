using Newtonsoft.Json;

namespace SteamMates.Models
{
    public class PlayedGame : Game
    {
        [JsonProperty("playtime_forever")]
        public int PlayTime { get; set; }
    }
}
