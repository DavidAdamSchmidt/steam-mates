import React, { useState } from "react";
import Tag from "./Tag";
import "./../static/css/TagContainer.css";

const TagContainer = ({ loading, onButtonClick }) => {
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

  const handleClick = () => {
    onButtonClick(tags);
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
      <button
        className="show-games-button"
        disabled={loading || tags.length === 0}
        onClick={handleClick}
      >
        Show Games
      </button>
    </div>
  );
};

export default TagContainer;
