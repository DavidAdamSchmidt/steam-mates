using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameCollectionForMultipleUsers
    {
        public List<GameStatForMultipleUsers> Games { get; set; }

        public Dictionary<string, DateTime?> LatestUpdates { get; set; }
    }
}
