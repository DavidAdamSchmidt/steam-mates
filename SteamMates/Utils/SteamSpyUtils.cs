using System.Collections.Generic;

namespace SteamMates.Utils
{
    public static class SteamSpyUtils
    {
        private const string GamesByTagPattern = @"https://steamspy.com/api.php?request=tag&tag={0}";

        public static string ApiName { get; } = "SteamSpy";

        public static IReadOnlyCollection<string> Tags { get; } = new[]
        {
            "Multiplayer",
            "Local Multiplayer",
            "Online Co-Op",
            "Local Co-Op"
        };

        public static string GetGamesByTagUrl(string tag)
        {
            return string.Format(GamesByTagPattern, tag);
        }
    }
}
