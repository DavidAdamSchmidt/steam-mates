using Newtonsoft.Json;
using System;

namespace SteamMates.Models.GameDetails
{
    public class ReleaseDate
    {
        [JsonProperty("coming_soon")]
        public bool ComingSoon { get; set; }

        public DateTime? Date { get; set; }
    }
}
