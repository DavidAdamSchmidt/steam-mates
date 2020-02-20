import React from "react";
import { Redirect } from "react-router-dom";
import { ERROR } from "../constants/routes";

export const showError = message => {
  return (
    <Redirect
      push
      to={{
        pathname: { ERROR },
        state: { message }
      }}
    />
  );
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
