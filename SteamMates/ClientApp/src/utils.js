import { PERSONA_NAME, REAL_NAME, VANITY_ID, STEAM_ID_64 } from "./constants";

export const getMatchingFriends = (friends, searchTerm) => {
  const results = [];
  if (searchTerm.length === 0) {
    return results;
  }

  for (const friend of friends) {
    const result = getMatches(friend, searchTerm);
    if (result !== undefined) {
      results.push(result);
    }
  }

  return results;
};

export const getProperty = (user, type) => {
  switch (type.ordinal) {
    case PERSONA_NAME.ordinal:
      return user.personaName;
    case REAL_NAME.ordinal:
      return user.realName;
    case VANITY_ID.ordinal:
      return user.vanityId;
    case STEAM_ID_64.ordinal:
      return user.steamId;
    default:
      return null;
  }
};

const getMatches = (user, searchTerm) => {
  const matches = [];

  for (const type of [PERSONA_NAME, REAL_NAME, VANITY_ID, STEAM_ID_64]) {
    const property = getProperty(user, type);
    if (property === null) {
      matches.push({ type: type, startIndex: -1 });
      continue;
    }

    const startIndex = property.toLowerCase().indexOf(searchTerm);
    matches.push({ type: type, startIndex: startIndex });
  }

  if (matches.some(match => match.startIndex > -1)) {
    return { user: user, matches: matches };
  }
};

// TODO: make this work again
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
