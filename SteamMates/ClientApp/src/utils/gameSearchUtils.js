export const getMatchingGames = (games, searchTerm) => {
  const results = [];

  for (const game of games) {
    let startIndex = game.game.name.toLowerCase().indexOf(searchTerm);

    if (startIndex > -1) {
      game.startIndex = startIndex;
      results.push(game);
    }
  }

  results.sort(searchResultComparer);

  return results;
};

const searchResultComparer = (a, b) => {
  if (a.startIndex === b.startIndex) {
    return a.game.name.toLowerCase().localeCompare(b.game.name.toLowerCase());
  }

  return a.startIndex < b.startIndex ? -1 : 1;
};
