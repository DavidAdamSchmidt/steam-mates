import { PERSONA_NAME, REAL_NAME, VANITY_ID, STEAM_ID_64 } from "./constants";

export const types = [PERSONA_NAME, REAL_NAME, VANITY_ID, STEAM_ID_64];

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
  results.sort(searchResultComparer);

  return results;
};

export const getPropertyValue = (user, type) => {
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

  for (const type of types) {
    const property = getPropertyValue(user, type);
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

const searchResultComparer = (a, b) => {
  const matchCountDiff = getMatchCountDifference(a, b);
  if (matchCountDiff !== 0) {
    return matchCountDiff;
  }

  for (const type of types) {
    const startIndexDiff = getStartIndexDifference(a, b, type);
    if (startIndexDiff !== 0) {
      return startIndexDiff;
    }
  }

  for (const type of types) {
    const result = comparePropertyValues(a, b, type);
    if (result !== 0) {
      return result;
    }
  }

  return 0;
};

const getMatchCountDifference = (a, b) => {
  const getRealMatches = match => match.startIndex > -1;
  const aMatchCount = a.matches.filter(getRealMatches).length;
  const bMatchCount = b.matches.filter(getRealMatches).length;

  return bMatchCount - aMatchCount;
};

const getStartIndexDifference = (a, b, type) => {
  const [aMatch, bMatch] = getMatchesByType(a, b, type);
  if (aMatch.startIndex === -1 || bMatch.startIndex === -1) {
    if (aMatch.startIndex === -1 && bMatch.startIndex === -1) {
      return 0;
    }
    return aMatch.startIndex === -1 ? 1 : -1;
  }

  return aMatch.startIndex - bMatch.startIndex;
};

const comparePropertyValues = (a, b, type) => {
  const [aMatch, bMatch] = getMatchesByType(a, b, type);
  if (aMatch.startIndex === -1) {
    return 0;
  }
  const aValue = getPropertyValue(a.user, type);
  const bValue = getPropertyValue(b.user, type);

  return aValue
    .toLowerCase()
    .substring(aMatch.startIndex)
    .localeCompare(bValue.toLowerCase().substring(bMatch.startIndex));
};

const getMatchesByType = (a, b, type) => {
  const getMatchByType = match => match.type.ordinal === type.ordinal;
  const aMatch = a.matches.find(getMatchByType);
  const bMatch = b.matches.find(getMatchByType);

  return [aMatch, bMatch];
};
