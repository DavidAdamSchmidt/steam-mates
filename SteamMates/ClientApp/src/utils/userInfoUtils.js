export const constructUserInfo = (user, friends, info) => {
  const userClone = getCloneWithInfo(user, info);

  const friendClones = [];
  for (const friend of friends) {
    friendClones.push(getCloneWithInfo(friend, info));
  }
  friendClones.sort(comparer);

  return [userClone, ...friendClones];
};

const getCloneWithInfo = (user, info) => {
  const userClone = JSON.parse(JSON.stringify(user));
  const userInfo = info.find(x => x.id === userClone.steamId);
  if (userInfo) {
    userClone.rating = userInfo.rating;
    userClone.hasGame = userInfo.hasGame;
  }

  return userClone;
};

const comparer = (a, b) => {
  if (a.rating == null && b.rating != null) {
    return 1;
  }

  if (a.rating > b.rating) {
    return -1;
  }

  if (!a.hasGame && b.hasGame) {
    return 1;
  }

  return -1;
};
