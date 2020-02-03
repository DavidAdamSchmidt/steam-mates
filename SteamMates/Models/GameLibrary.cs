using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameLibrary : IComparable<GameLibrary>
    {
        public string UserId { get; set; }

        public List<PlayedGame> Games { get; set; }

        public DateTime? LatestUpdate { get; set; }

        public int CompareTo(GameLibrary other)
        {
            return Games.Count.CompareTo(other.Games.Count);
        }
    }
}
