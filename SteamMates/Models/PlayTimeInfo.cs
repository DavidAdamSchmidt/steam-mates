namespace SteamMates.Models
{
    public class PlayTimeInfo
    {
        public PlayTimeInfo(string userId, int playTime)
        {
            UserId = userId;
            PlayTime = playTime;
        }

        public string UserId { get; set; }

        public int PlayTime { get; set; }
    }
}
