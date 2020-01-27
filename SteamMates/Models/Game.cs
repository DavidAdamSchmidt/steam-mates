using Newtonsoft.Json;
using System;
using System.Diagnostics.CodeAnalysis;

namespace SteamMates.Models
{
    public class Game : IComparable<Game>
    {
        public int AppId { get; set; }

        public string Name { get; set; }

        [JsonProperty("img_icon_url")]
        public string ImgIconUrl { get; set; }

        [JsonProperty("img_logo_url")]
        public string ImgLogoUrl { get; set; }

        [JsonProperty("has_community_visible_stats")]
        public string HasCommunityVisibleStats { get; set; }

        public int CompareTo([AllowNull] Game other)
        {
            return string.Compare(Name, other.Name, StringComparison.OrdinalIgnoreCase);
        }
    }
}
