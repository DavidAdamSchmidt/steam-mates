using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameStat
    {
        public Game Game { get; set; }

        public List<RatedGame> Ratings { get; set; }

        public List<PlayTimeInfo> PlayTimes { get; set; }

        public List<string> Tags { get; set; }
    }
}
