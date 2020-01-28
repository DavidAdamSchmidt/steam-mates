import React, { useState } from "react";
import Tag from "./Tag";

const TagContainer = ({ loading, onReady }) => {
  const initialTagsState = [
    "Multiplayer",
    "Local Multiplayer",
    "Online Co-Op",
    "Local Co-Op"
  ];
  const [tags, setTags] = useState(initialTagsState);

  const add = tagToAdd => {
    if (!tags.includes(tagToAdd)) {
      setTags([...tags, tagToAdd]);
    }
  };

  const remove = tagToRemove => {
    if (tags.includes(tagToRemove)) {
      setTags(tags.filter(tag => tag !== tagToRemove));
    }
  };

  return (
    <div className="tag-container">
      {initialTagsState.map((tag, index) => (
        <Tag
          key={index}
          name={tag}
          checked={tags.includes(tag)}
          add={add}
          remove={remove}
        />
      ))}
      <button disabled={loading} onClick={() => onReady(tags)}>Show Games</button>
    </div>
  );
};

export default TagContainer;
