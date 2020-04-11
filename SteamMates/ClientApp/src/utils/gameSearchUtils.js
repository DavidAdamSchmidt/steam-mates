export const filterGames = (games, tags, searchTerm, dataOrganizer) => {
  const matchingGames = getMatchingGames(games, tags, searchTerm.toLowerCase());

  dataOrganizer(matchingGames, searchTerm);

  return matchingGames;
};

export const organizeByCount = games => {
  if (games.length > 0) {
    games[0].title = `Results (${games.length})`;
  }
};

export const organizeByRatingCount = (games, searchTerm) => {
  if (searchTerm.length > 2) {
    organizeByCount(games);

    return;
  }

  let data = [];

  for (let i = 4; i >= 0; i--) {
    let results = games.filter(x => x.ratings.length === i);

    if (results.length > 0) {
      results[0].title = `${
        i ? `Rated by ${i} user${i > 1 ? "s" : ""}` : "Unrated"
      } (${results.length})`;
    }

    data = data.concat(results);
  }

  return data;
};

const getMatchingGames = (games, tags, searchTerm) => {
  const results = [];
  const filteredByTags = tags.some(tag => !tag.checked)
    ? filterGamesByTags(games, tags)
    : games;

  if (searchTerm.length < 3) {
    return filteredByTags;
  }

  for (const game of filteredByTags) {
    let startIndex = game.game.name.toLowerCase().indexOf(searchTerm);

    if (startIndex > -1) {
      game.startIndex = startIndex;
      results.push(game);
    }
  }

  results.sort(searchResultComparer);

  return results;
};

const filterGamesByTags = (games, tags) => {
  const tagNames = tags.filter(x => x.checked).map(x => x.name);

  return games.filter(game => game.tags.some(tag => tagNames.includes(tag)));
};

const searchResultComparer = (a, b) => {
  if (a.startIndex === b.startIndex) {
    return a.game.name.toLowerCase().localeCompare(b.game.name.toLowerCase());
  }

  return a.startIndex < b.startIndex ? -1 : 1;
};
