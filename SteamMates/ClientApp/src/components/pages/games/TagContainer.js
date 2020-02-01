import React, { useContext } from "react";
import TagContext from "../../../contexts/TagContext";
import Tag from "./Tag";
import "../../../static/css/TagContainer.css";

const TagContainer = () => {
  const { initialTagsState, tags } = useContext(TagContext);

  return (
    <div className="tag-container">
      {initialTagsState.map((tag, index) => (
        <Tag
          key={index}
          name={tag}
          checked={tags.includes(tag)}
        />
      ))}
    </div>
  );
};

export default TagContainer;
