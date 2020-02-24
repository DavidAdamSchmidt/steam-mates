import { css } from "styled-components";

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

export const getGameCardBackgroundColor = avg => {
  switch (true) {
    case avg === undefined:
      return css`rgba(0, 0, 39, 0.69)`;
    case avg >= 4.5:
      return css`rgba(31, 93, 43, 0.9)`;
    case avg >= 3.5:
      return css`rgba(27, 78, 128, 0.9)`;
    case avg >= 2.5:
      return css`rgba(200, 149, 69, 0.9)`;
    case avg >= 0.0:
      return css`rgba(186, 65, 41, 0.9)`;
    default:
      return css`rgba(61, 61, 61, 0.9)`;
  }
};

const getAverageOfRatings = ratings => {
  return ratings.map(x => x.rating).reduce((a, b) => a + b, 0) / ratings.length;
};
