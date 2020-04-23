import React, { createContext, useState } from "react";
import { ORDER } from "../constants";

const SettingsContext = createContext(null);

export const SettingsProvider = props => {
  const [tags, setTags] = useState([
    { name: "Multiplayer", checked: true },
    { name: "Local Multiplayer", checked: true },
    { name: "Online Co-Op", checked: true },
    { name: "Local Co-Op", checked: true }
  ]);
  const [ratings, setRatings] = useState([
    { name: "Rated", checked: true },
    { name: "From", min: 1, max: 5, selected: 1 },
    { name: "To", min: 1, max: 5, selected: 5 },
    { name: "Unrated", checked: true }
  ]);
  const [orderBy, setOrderBy] = useState({
    value: ORDER.RATING,
    asc: false,
    applyToSearch: false
  });

  return (
    <SettingsContext.Provider
      value={{ tags, setTags, ratings, setRatings, orderBy, setOrderBy }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
