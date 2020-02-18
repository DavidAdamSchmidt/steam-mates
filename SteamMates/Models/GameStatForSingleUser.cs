using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameStatForSingleUser : IComparable<GameStatForSingleUser>
    {
        public Game Game { get; set; }

        public List<string> Tags { get; set; }

        public int Rating { get; set; }

        public int PlayTime { get; set; }
        public int CompareTo(GameStatForSingleUser other)
        {
            if (Rating != other.Rating)
            {
                return other.Rating.CompareTo(Rating);
            }

            return string.CompareOrdinal(Game.Name, other.Game.Name);
        }
    }
}
