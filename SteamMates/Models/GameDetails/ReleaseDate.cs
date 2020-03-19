using Newtonsoft.Json;

namespace SteamMates.Models.GameDetails
{
    public class ReleaseDate
    {
        [JsonProperty("coming_soon")]
        public bool ComingSoon { get; set; }

        public string Date { get; set; }
    }
}
