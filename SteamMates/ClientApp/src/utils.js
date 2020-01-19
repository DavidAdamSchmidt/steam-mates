export const getMatchingFriends = (friends, searchTerm) => {
  if (searchTerm.length === 0) {
    return [];
  }

  const matches = [];

  for (let friend of friends) {
    let startIndex = friend.personaName.toLowerCase().indexOf(searchTerm);
    if (startIndex > -1) {
      matches.push({ friend: friend, startIndex: startIndex });
    }
  }

  return matches;
};
