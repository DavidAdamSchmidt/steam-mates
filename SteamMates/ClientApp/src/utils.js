export const getMatchingFriends = (friends, searchTerm) => {
  const matches = [];

  if (searchTerm.length === 0) {
    return matches;
  }

  for (const friend of friends) {
    const startIndex = friend.personaName.toLowerCase().indexOf(searchTerm);
    if (startIndex > -1) {
      matches.push({ friend: friend, startIndex: startIndex });
    }
  }

  matches.sort(matchComparer);

  return matches;
};

const matchComparer = (a, b) => {
  const startIndexDiff = a.startIndex - b.startIndex;

  return startIndexDiff !== 0
    ? startIndexDiff
    : a.friend.personaName
        .toLowerCase()
        .substring(a.startIndex)
        .localeCompare(
          b.friend.personaName.toLowerCase().substring(b.startIndex)
        );
};
