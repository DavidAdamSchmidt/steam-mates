import { API_ROOT } from "../constants";

export const constructGamePageUrl = (gameId, friends) => {
  return `${API_ROOT}/games/${gameId}${
    friends.length > 0 ? "?" : ""
  }${friends
    .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
    .join("")}`;
};

export const calculateTitleFontSize = titleLength => {
  switch (true) {
    case titleLength > 60:
      return 18;
    case titleLength > 40:
      return 22;
    case titleLength > 30:
      return 25;
    case titleLength > 20:
      return 28;
    default:
      return 31;
  }
};

export const calculateCreatorsFontSize = (
  developersTextLength,
  publishersTextLength
) => {
  return (
    10 - Math.floor(Math.max(developersTextLength, publishersTextLength) / 30)
  );
};

export const constructUserInfo = (user, friends, info) => {
  const userDetails = mergeInfoWithUserData(user, info);

  const friendDetails = [];
  for (let i = friends.length - 1; i >= 0; i--) {
    friendDetails.push(mergeInfoWithUserData(friends[i], info));
  }
  friendDetails.sort(comparer);

  return [userDetails, ...friendDetails];
};

export const calculatePlayTime = minutes => {
  switch (true) {
    case minutes === 0:
      return 0;
    case minutes < 3:
      return 0.1;
    case minutes < 20 * 60:
      return (minutes / 60).toFixed(1);
    default:
      return Math.round(minutes / 60);
  }
};

const mergeInfoWithUserData = (user, info) => {
  const userInfo = info.find(x => x.id === user.steamId);

  return {
    steamId: user.steamId,
    avatarFull: user.avatarFull,
    rating: userInfo.rating,
    playTime: userInfo.playTime,
    hasGame: userInfo.hasGame,
    privateLibrary: userInfo.privateLibrary
  };
};

const comparer = (a, b) => {
  if (a.privateLibrary && !b.privateLibrary) {
    return 1;
  }

  if (a.rating == null && b.rating != null) {
    return 1;
  }

  if (a.rating > b.rating) {
    return -1;
  }

  if ((!a.hasGame && b.hasGame) || b.playTime > a.playTime) {
    return 1;
  }

  return -1;
};
