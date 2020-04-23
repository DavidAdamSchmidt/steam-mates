import React from "react";
import { Redirect } from "react-router-dom";
import { ERROR, PATH } from "../constants";

export const showError = message => {
  return (
    <Redirect
      push
      to={{
        pathname: PATH.ERROR,
        state: { message }
      }}
    />
  );
};

export const checkPageError = (status, error, user, friends) => {
  if (!error) {
    return;
  }

  if (status === 400) {
    return showError(error);
  }

  if (
    (status === 503 && error.apiName) ||
    (status === 500 && error.message === ERROR.DATABASE_ERROR) ||
    (status === 404 && (error.tagName || error.gameId))
  ) {
    return showError(error.message);
  }

  if (status === 404 && error.userId) {
    if (error.userId === user.steamId) {
      return showError(
        "Could not access your library. Please make sure your game details are set to public."
      );
    }

    return showError(
      `Could not access ${
        friends.find(friend => friend.steamId === error.userId).personaName
      }'s library`
    );
  }
};

export const getLibraryError = privateProfiles => {
  const names = privateProfiles.map(x => x.personaName);

  if (privateProfiles.length < 1 || privateProfiles.length > 4) {
    return null;
  }

  if (privateProfiles.length === 1) {
    return `${names[0]} has a private library.`;
  }

  return `${names.slice(0, names.length - 1).join(", ")} and ${
    names[names.length - 1]
  } have private libraries.`;
};
