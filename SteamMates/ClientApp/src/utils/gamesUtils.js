import { css } from "styled-components";
import { RATING, TITLE } from "../constants/orderByOptions";

export const filterGames = (games, searchTerm, settings, dataOrganizer) => {
  let results = [];
  const filteredByTags = settings.tags.some(tag => !tag.checked)
    ? filterByTags(games, settings.tags)
    : games;
  const filteredByRatings = filterByRatings(filteredByTags, settings.ratings);

  if (searchTerm.length > 2) {
    for (const game of filteredByRatings) {
      let startIndex = game.game.name.toLowerCase().indexOf(searchTerm);

      if (startIndex > -1) {
        game.startIndex = startIndex;
        results.push(game);
      }
    }
  } else {
    results = filteredByRatings;
  }

  results.sort(getComparer(settings.orderBy, searchTerm));

  return dataOrganizer(results, searchTerm, settings.orderBy);
};

export const organizeByCount = games => {
  if (games.length > 0) {
    games[0].title = `Results (${games.length})`;
  }

  return games;
};

export const organizeByRatingCount = (games, searchTerm, orderBy) => {
  if (
    orderBy.value === TITLE ||
    (searchTerm.length > 2 && !orderBy.applyToSearch)
  ) {
    return organizeByCount(games);
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

export const addAverageOfRatings = games => {
  games.forEach(x => (x.rating = getAverageOfRatings(x.ratings)));
};

export const getCardBackground = rating => {
  switch (true) {
    case rating >= 4.5:
      return css`linear-gradient(
        to right bottom, rgba(7, 76, 0, 0.9), rgba(98, 181, 91, 0.9))`;
    case rating >= 3.5:
      return css`linear-gradient(
        to right bottom, rgba(43, 43, 133, 0.9), rgba(0, 159, 253, 0.9))`;
    case rating >= 2.5:
      return css`linear-gradient(
        to right bottom, rgba(255, 119, 48, 0.9), rgba(255, 185, 0, 0.9))`;
    case rating >= 1.5:
      return css`linear-gradient(
        to right bottom, rgba(164, 6, 6, 0.9), rgba(252, 152, 66, 0.9))`;
    case rating > 0:
      return css`linear-gradient(
        to right bottom, rgba(11, 11, 11, 0.9), rgba(105, 105, 105, 0.9))`;
    default:
      return css`rgba(0, 0, 39, 0.69)`;
  }
};

const getAverageOfRatings = ratings => {
  return ratings.map(x => x.rating).reduce((a, b) => a + b, 0) / ratings.length;
};

const filterByTags = (games, tags) => {
  const tagNames = tags.filter(x => x.checked).map(x => x.name);

  return games.filter(game => game.tags.some(tag => tagNames.includes(tag)));
};

const filterByRatings = (games, ratings) =>
  games.filter(
    game =>
      (ratings[3].checked && !game.rating) ||
      (ratings[0].checked &&
        game.rating >= ratings[1].selected &&
        game.rating <= ratings[2].selected)
  );

const getComparer = (orderBy, searchTerm) => {
  if (searchTerm.length > 2 && !orderBy.applyToSearch) {
    return (a, b) =>
      a.startIndex === b.startIndex
        ? a.game.name < b.game.name
          ? -1
          : 1
        : a.startIndex - b.startIndex;
  }

  const x = orderBy.asc ? 1 : -1;
  const y = orderBy.asc ? -1 : 1;

  if (orderBy.value === RATING) {
    return (a, b) =>
      a.rating === b.rating
        ? a.game.name < b.game.name
          ? -1
          : 1
        : a.rating > b.rating
        ? x
        : y;
  }

  return (a, b) => (a.game.name > b.game.name ? x : y);
};
