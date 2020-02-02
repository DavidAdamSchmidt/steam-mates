import React, { createContext, useState } from "react";

const TagContext = createContext(null);

export const TagProvider = props => {
  const initialTagsState = [
    "Multiplayer",
    "Local Multiplayer",
    "Online Co-Op",
    "Local Co-Op"
  ];
  const [tags, setTags] = useState(initialTagsState);

  return (
    <TagContext.Provider value={{ initialTagsState, tags, setTags }}>
      {props.children}
    </TagContext.Provider>
  );
};

export default TagContext;
