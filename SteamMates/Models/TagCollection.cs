using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class TagCollection
    {
        public Dictionary<string, List<int>> GameIdsByTags { get; set; }

        public DateTime? LatestUpdate { get; set; }
    }
}
