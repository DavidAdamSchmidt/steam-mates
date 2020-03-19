import React from "react";
import { Redirect } from "react-router-dom";
import { ERROR } from "../constants/routes";
import { DATABASE_ERROR } from "../constants/request";

export const showError = message => {
  return (
    <Redirect
      push
      to={{
        pathname: ERROR,
        state: { message }
      }}
    />
  );
};

export const checkPageError = (status, error) => {
  if (!error) {
    return;
  }

  if (status === 400) {
    return showError(error);
  }

  if (
    (status === 503 && error.apiName) ||
    (status === 500 && error.message === DATABASE_ERROR) ||
    (status === 404 && (error.tagName || error.gameId))
  ) {
    return showError(error.message);
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
