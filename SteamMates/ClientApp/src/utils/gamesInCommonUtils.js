export const addAverageOfRatings = games => {
  games.forEach(x => (x.averageOfRatings = getAverageOfRatings(x.ratings)));
};

export const ratingComparer = (a, b) => {
  if (!isNaN(a.averageOfRatings) && isNaN(b.averageOfRatings)) {
    return -1;
  }

  if (a.averageOfRatings !== b.averageOfRatings) {
    return b.averageOfRatings - a.averageOfRatings;
  }

  return a.game.name.localeCompare(b.game.name);
};

export const getGameGroups = games => {
  const gameGroups = [];

  for (let i = 4; i >= 0; i--) {
    let result = games.filter(x => x.ratings.length === i);
    if (result.length > 0) {
      gameGroups.push({
        title: i ? `Rated by ${i} user${i > 1 ? "s" : ""}` : "Unrated",
        games: result
      });
    }
  }

  return gameGroups;
};

const getAverageOfRatings = ratings => {
  return ratings.map(x => x.rating).reduce((a, b) => a + b, 0) / ratings.length;
};
