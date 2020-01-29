namespace SteamMates.Utils
{
    public static class SiteUtils
    {
        public static (string UserInfo, string Tags) CacheKeys { get; } = ("UserInfo", "Tags");

        public static string UserCookieName { get; } = "SteamMates_user";
    }
}
