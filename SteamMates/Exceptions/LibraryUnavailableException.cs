using System;
using System.Runtime.Serialization;

namespace SteamMates.Exceptions
{
    [Serializable]
    public class LibraryUnavailableException : Exception
    {
        public LibraryUnavailableException()
        {
        }

        public LibraryUnavailableException(string userId)
            : base(userId)
        {
        }

        public LibraryUnavailableException(string userId, Exception innerException)
            : base(userId, innerException)
        {
        }

        protected LibraryUnavailableException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
