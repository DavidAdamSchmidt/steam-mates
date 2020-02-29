using System.ComponentModel.DataAnnotations.Schema;

namespace SteamMates.Models.Persistence
{
    public class Rating
    {
        public long Id { get; set; }

        public UserIdentifier User { get; set; }

        [ForeignKey(nameof(User))]
        public long UserId { get; set; }

        public GameIdentifier Game { get; set; }

        [ForeignKey(nameof(Game))]
        public long GameId { get; set; }

        public byte Value { get; set; }
    }
}
