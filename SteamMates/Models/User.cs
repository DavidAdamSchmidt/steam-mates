using Newtonsoft.Json;
using SteamMates.Utils;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace SteamMates.Models
{
    public class User : IComparable<User>
    {
        private string _vanityId;

        public string SteamId { get; set; }

        public string PersonaName { get; set; }

        public string RealName { get; set; }

        public string ProfileUrl { get; set; }

        public string Avatar { get; set; }

        public string AvatarMedium { get; set; }

        public string AvatarFull { get; set; }

        // 1 - not visible
        // 3 - visible
        public int CommunityVisibilityState { get; set; }

        // 0 - Offline
        // 1 - Online
        // 2 - Busy
        // 3 - Away
        // 4 - Snooze
        // 5 - looking to trade
        // 6 - looking to play
        // If the user's profile is private, this will always be 0.
        public int PersonaState { get; set; }

        // 1 - the user has a community profile configured
        public int? ProfileState { get; set; }

        // If the user is currently in-game, this value will be returned and set to the gameid of that game.
        public int? GameId { get; set; }

        // If the user is currently in-game, this will be the name of the game they are playing.
        // This may be the name of a non-Steam game shortcut.
        public string GameExtraInfo { get; set; }

        [JsonIgnore]
        public string VanityId => _vanityId ??= SteamUtils.GetVanityIdFromProfileUrl(ProfileUrl);

        [JsonIgnore]
        public IList<User> Friends { get; set; }

        [JsonIgnore]
        public DateTime LatestUpdate { get; set; }

        public int CompareTo([AllowNull] User other)
        {
            return string.Compare(PersonaName, other.PersonaName, StringComparison.OrdinalIgnoreCase);
        }
    }
}
