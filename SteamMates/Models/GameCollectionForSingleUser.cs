using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameCollectionForSingleUser
    {
        public List<GameStatForSingleUser> Games { get; set; }

        public Dictionary<string, DateTime?> LatestUpdates { get; set; }
    }
}
