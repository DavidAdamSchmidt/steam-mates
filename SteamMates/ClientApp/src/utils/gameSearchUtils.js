import { RATING, TITLE } from "../constants/orderByOptions";

export const filterGames = (games, searchTerm, settings, dataOrganizer) => {
  let results = [];
  const filteredByTags = settings.tags.some(tag => !tag.checked)
    ? filterGamesByTags(games, settings.tags)
    : games;
  const filteredByRatings = filterGamesByRatings(
    filteredByTags,
    settings.ratings
  );

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

  results.sort(
    getComparer(
      settings.orderBy,
      searchTerm,
      games.some(game => game.averageOfRatings)
    )
  );

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

const filterGamesByTags = (games, tags) => {
  const tagNames = tags.filter(x => x.checked).map(x => x.name);

  return games.filter(game => game.tags.some(tag => tagNames.includes(tag)));
};

const filterGamesByRatings = (games, ratings) => {
  if (games.some(game => game.averageOfRatings)) {
    return games.filter(
      game =>
        (ratings[3].checked && !game.averageOfRatings) ||
        (ratings[0].checked &&
          game.averageOfRatings >= ratings[1].selected &&
          game.averageOfRatings <= ratings[2].selected)
    );
  }

  return games.filter(
    game =>
      (ratings[3].checked && !game.rating) ||
      (ratings[0].checked &&
        game.rating >= ratings[1].selected &&
        game.rating <= ratings[2].selected)
  );
};

const getComparer = (orderBy, searchTerm, hasAverageOfRatings) => {
  const x = orderBy.asc ? 1 : -1;
  const y = orderBy.asc ? -1 : 1;

  if (searchTerm.length > 2 && !orderBy.applyToSearch) {
    return (a, b) => {
      if (a.startIndex === b.startIndex) {
        return a.game.name < b.game.name ? -1 : 1;
      }

      return a.startIndex - b.startIndex;
    };
  }

  if (orderBy.value === RATING) {
    if (hasAverageOfRatings) {
      return (a, b) => {
        if (a.averageOfRatings === b.averageOfRatings) {
          return a.game.name < b.game.name ? -1 : 1;
        }

        return a.averageOfRatings > b.averageOfRatings ? x : y;
      };
    }

    return (a, b) => {
      if (a.rating === b.rating) {
        return a.game.name < b.game.name ? -1 : 1;
      }

      return a.rating > b.rating ? x : y;
    };
  }

  return (a, b) => (a.game.name > b.game.name ? x : y);
};
