using System.Collections.Generic;

namespace SteamMates.Models
{
    public class GameStat
    {
        public GameStat(Game game, List<PlayTimeInfo> playTimes)
        {
            Game = game;
            PlayTimes = playTimes;
        }

        public Game Game { get; set; }

        public List<PlayTimeInfo> PlayTimes { get; set; }
    }
}
