using System.Collections.Generic;

namespace SteamMates.Models.Persistence
{
    public class GameIdentifier
    {
        public long Id { get; set; }

        public int SteamId { get; set; }

        public ICollection<Rating> Ratings { get; set; }
    }
}
