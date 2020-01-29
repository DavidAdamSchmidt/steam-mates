using System;
using System.Collections.Generic;

namespace SteamMates.Models
{
    public class TagList
    {
        public Dictionary<string, List<int>> Tags { get; set; }

        public DateTime LatestUpdate { get; set; }
    }
}
