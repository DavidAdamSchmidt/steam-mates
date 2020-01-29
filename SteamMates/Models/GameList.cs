using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameList
    {
        public List<GameStat> Games { get; set; }

        public Dictionary<string, DateTime> LatestUpdates { get; set; }
    }
}
