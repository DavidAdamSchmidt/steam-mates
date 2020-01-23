using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameLibrary : IComparable<GameLibrary>
    {
        public string UserId { get; set; }

        public List<Game> Games { get; set; }

        public int CompareTo(GameLibrary other)
        {
            return Games.Count.CompareTo(other.Games.Count);
        }
    }
}
