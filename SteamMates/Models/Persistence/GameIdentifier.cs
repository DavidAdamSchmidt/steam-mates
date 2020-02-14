using System.Collections.Generic;

namespace SteamMates.Models.Persistence
{
    public class GameIdentifier
    {
        public int Id { get; set; }

        public int SteamId { get; set; }

        public ICollection<Vote> Votes { get; set; }
    }
}
