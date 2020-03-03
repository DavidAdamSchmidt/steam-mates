using Newtonsoft.Json;
using SteamMates.Converters;
using System.Collections.Generic;

namespace SteamMates.Models.GameDetails
{
    public class GameInfo
    {
        [JsonProperty("steam_appid")]
        public int SteamId { get; set; }

        public string Name { get; set; }

        [JsonProperty("short_description")]
        public string ShortDescription { get; set; }

        [JsonProperty("detailed_description")]
        public string DetailedDescription { get; set; }

        [JsonProperty("supported_languages")]
        public string SupportedLanguages { get; set; }

        public string Website { get; set; }

        [JsonProperty("is_free")]
        public bool IsFree { get; set; }

        [JsonProperty("controller_support")]
        public string ControllerSupport { get; set; }

        [JsonProperty("pc_requirements")]
        [JsonConverter(typeof(SystemRequirementsConverter))]
        public SystemRequirements PcRequirements { get; set; }

        [JsonProperty("mac_requirements")]
        [JsonConverter(typeof(SystemRequirementsConverter))]
        public SystemRequirements MacRequirements { get; set; }

        [JsonProperty("linux_requirements")]
        [JsonConverter(typeof(SystemRequirementsConverter))]
        public SystemRequirements LinuxRequirements { get; set; }

        public ICollection<string> Developers { get; set; }

        public ICollection<string> Publishers { get; set; }

        public IDictionary<string, bool> Platforms { get; set; }

        public MetacriticRating Metacritic { get; set; }

        public ICollection<Category> Categories { get; set; }

        public ICollection<Category> Genres { get; set; }

        public ICollection<Screenshot> Screenshots { get; set; }

        public ICollection<Movie> Movies { get; set; }

        public IDictionary<string, int> Recommendations { get; set; }

        [JsonProperty("release_date")]
        public ReleaseDate ReleaseDate { get; set; }

        public List<RatedGame> Ratings { get; set; }
    }
}
