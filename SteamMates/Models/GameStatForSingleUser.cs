using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameStatForSingleUser
    {
        public Game Game { get; set; }

        public List<string> Tags { get; set; }

        public int Rating { get; set; }

        public int PlayTime { get; set; }
    }
}
