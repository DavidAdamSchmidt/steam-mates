using System;

namespace SteamMates.Exceptions
{
    public class ApiUnavailableException : Exception
    {
        public ApiUnavailableException()
        {
        }

        public ApiUnavailableException(string message)
            : base(message)
        {
        }

        public ApiUnavailableException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public ApiUnavailableException(string message, string apiName)
            : base(message)
        {
            ApiName = apiName;
        }

        public ApiUnavailableException(string message, string apiName, Exception innerException)
            : base(message, innerException)
        {
            ApiName = apiName;
        }

        public string ApiName { get; }
    }
}
