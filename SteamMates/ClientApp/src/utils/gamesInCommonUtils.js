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

const getAverageOfRatings = ratings => {
  return ratings.map(x => x.rating).reduce((a, b) => a + b, 0) / ratings.length;
};
