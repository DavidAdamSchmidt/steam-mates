using System.ComponentModel.DataAnnotations.Schema;

namespace SteamMates.Models.Persistence
{
    public class Rating
    {
        public int Id { get; set; }

        public UserIdentifier User { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        public GameIdentifier Game { get; set; }

        [ForeignKey(nameof(Game))]
        public int GameId { get; set; }

        public int Value { get; set; }
    }
}
