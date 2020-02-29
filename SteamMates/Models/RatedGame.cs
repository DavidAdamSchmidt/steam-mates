namespace SteamMates.Models
{
    public class RatedGame
    {
        public string UserId { get; set; }

        // internal get = deserialize only
        public int GameId { internal get; set; }

        public byte Rating { get; set; }
    }
}
