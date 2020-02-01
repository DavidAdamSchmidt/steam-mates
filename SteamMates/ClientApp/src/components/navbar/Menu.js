import React from "react";
import { Link } from "react-router-dom";
import "../../static/css/Menu.css";

const Menu = ({ name }) => {
  return (
    <Link className="menu-link" to={`/${name.toLowerCase()}`}>
      <div className="menu">{name ? name : "Home"}</div>
    </Link>
  );
};

export default Menu;
