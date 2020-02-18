namespace SteamMates.Validation
{
    public static class ValidationError
    {
        public static readonly string Unauthorized = "User needs to be authenticated.";
        public static readonly string AlreadyAuthenticated = "User has already been authenticated.";
        public static readonly string NoUserId = "No user ID was received.";
        public static readonly string TooManyUserIds = "Too many user IDs were received.";
        public static readonly string WrongUserId = "Wrong user ID was received.";

        public static readonly string InvalidRatingPattern =
            "Rating value {0} is invalid (needs to be between 1 and 5).";

        public static readonly string UserHasGameAbortedPattern =
            "Could not determine whether the user has the game or not. Reason: {0}";

        public static readonly string UserDoesNotHaveGamePattern =
            "User does not have game {0} in their library.";
    }
}
