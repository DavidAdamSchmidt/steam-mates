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
