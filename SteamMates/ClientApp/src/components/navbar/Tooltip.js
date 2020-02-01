import React from "react";
import "../../static/css/Tooltip.css";

const Tooltip = ({ text, children }) => {
  return (
    <span className="tooltip">
      {children}
      <span className="tooltip-text">{text}</span>
    </span>
  );
};

export default Tooltip;
