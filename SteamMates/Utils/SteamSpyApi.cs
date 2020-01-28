namespace SteamMates.Utils
{
    public static class SteamSpyApi
    {
        private const string GamesByTagPattern = @"https://steamspy.com/api.php?request=tag&tag={0}";

        public static string GetGamesByTagUrl(string tag)
        {
            return string.Format(GamesByTagPattern, tag);
        }
    }
}
