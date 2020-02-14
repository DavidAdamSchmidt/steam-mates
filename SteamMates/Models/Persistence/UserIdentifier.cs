using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SteamMates.Models.Persistence
{
    public class UserIdentifier
    {
        public int Id { get; set; }

        [Required]
        [StringLength(17)]
        public string SteamId { get; set; }

        public ICollection<Vote> Votes { get; set; }
    }
}
