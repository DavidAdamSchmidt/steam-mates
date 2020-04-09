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

export const organizeByRatingCount = games => {
  let data = [];

  for (let i = 4; i >= 0; i--) {
    let result = games.filter(x => x.ratings.length === i);
    if (result.length > 0) {
      result[0].title = i ? `Rated by ${i} user${i > 1 ? "s" : ""}` : "Unrated";
    }
    data = data.concat(result);
  }

  return data;
};

export const getGameCardBackgroundColor = rating => {
  switch (true) {
    case rating >= 4.5:
      return css`linear-gradient(to right bottom, rgba(7,76,0,0.9), rgba(98,181,91,0.9)
)`;
    case rating >= 3.5:
      return css`linear-gradient(to right bottom, rgba(43,43,133,0.9), rgba(0,159,253,0.9)
)`;
    case rating >= 2.5:
      return css`linear-gradient(to right bottom, rgba(255,119,48,0.9), rgba(255,185,0,0.9))`;
    case rating >= 1.5:
      return css`linear-gradient(to right bottom, rgba(164,6,6,0.9), rgba(252,152,66,0.9))`;
    case rating >= 0.0:
      return css`linear-gradient(to right bottom, rgba(11,11,11,0.9), rgba(105,105,105,0.9))`;
    default:
      return css`rgba(0,0,39,0.69)`;
  }
};

const getAverageOfRatings = ratings => {
  return ratings.map(x => x.rating).reduce((a, b) => a + b, 0) / ratings.length;
};
