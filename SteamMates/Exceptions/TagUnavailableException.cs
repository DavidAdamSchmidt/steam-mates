using System;

namespace SteamMates.Exceptions
{
    public class TagUnavailableException : Exception
    {
        public TagUnavailableException()
        {
        }

        public TagUnavailableException(string message)
            : base(message)
        {
        }

        public TagUnavailableException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public TagUnavailableException(string message, string tagName)
            : base(message)
        {
            TagName = tagName;
        }

        public TagUnavailableException(string message, string tagName, Exception innerException)
            : base(message, innerException)
        {
            TagName = tagName;
        }

        public string TagName { get; }
    }
}
