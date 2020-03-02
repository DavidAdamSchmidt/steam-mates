using System.Collections.Generic;

namespace SteamMates.Models.GameDetails
{
    public class Movie
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Thumbnail { get; set; }

        public IDictionary<string, string> Webm { get; set; }
    }
}
