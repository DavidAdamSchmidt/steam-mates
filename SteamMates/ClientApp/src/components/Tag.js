import React from "react";

const Tag = ({ name, checked, add, remove, onChange }) => {
  const handleClick = e => {
    if (e.target.checked) {
      add(e.target.value);
    } else {
      remove(e.target.value);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        value={name}
        defaultChecked={checked}
        onClick={handleClick}
        onChange={onChange}
      />
      {name}
    </div>
  );
};

export default Tag;
