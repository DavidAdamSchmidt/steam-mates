import React from "react";

const Tag = ({ name, checked, add, remove }) => {

  const handleClick = e => {
    if (e.target.checked) {
      add(e.target.value);
    } else {
      remove(e.target.value);
    }
  };

  return (
    <div>
      <input type="checkbox" value={name} defaultChecked={checked} onClick={handleClick} />{name}
    </div>
  );
};

export default Tag;
