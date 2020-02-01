import React, { useContext } from "react";
import TagContext from "../../../contexts/TagContext";

const Tag = ({ name, checked }) => {
  const { tags, setTags } = useContext(TagContext);

  const handleClick = e => {
    if (e.target.checked) {
      setTags([...tags, e.target.value]);
    } else {
      setTags(tags.filter(tag => tag !== e.target.value));
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        value={name}
        defaultChecked={checked}
        onClick={handleClick}
      />
      {name}
    </div>
  );
};

export default Tag;
