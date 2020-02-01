using System;

namespace SteamMates.Exceptions
{
    public class LibraryUnavailableException : Exception
    {
        public LibraryUnavailableException()
        {
        }

        public LibraryUnavailableException(string message)
            : base(message)
        {
        }

        public LibraryUnavailableException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public LibraryUnavailableException(string message, string userId)
            : base(message)
        {
            UserId = userId;
        }

        public LibraryUnavailableException(string message, string userId, Exception innerException)
            : base(message, innerException)
        {
            UserId = userId;
        }

        public string UserId { get; }
    }
}
