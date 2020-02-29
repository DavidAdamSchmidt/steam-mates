using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SteamMates.Models.Persistence
{
    public class UserIdentifier
    {
        public long Id { get; set; }

        [Required]
        [StringLength(17)]
        public string SteamId { get; set; }

        public ICollection<Rating> Ratings { get; set; }
    }
}
