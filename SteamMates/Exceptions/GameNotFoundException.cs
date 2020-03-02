using System;

namespace SteamMates.Exceptions
{
    public class GameNotFoundException : Exception
    {
        public GameNotFoundException()
        {
        }

        public GameNotFoundException(string message)
            : base(message)
        {
        }

        public GameNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public GameNotFoundException(string message, int gameId)
            : base(message)
        {
            GameId = gameId;
        }

        public GameNotFoundException(string message, Exception innerException, int gameId)
            : base(message, innerException)
        {
            GameId = gameId;
        }

        public int GameId { get; set; }
    }
}
