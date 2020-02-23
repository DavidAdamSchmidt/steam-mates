import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const MenuLink = styled(Link)`
  text-decoration: none;
`;

const SimpleMenu = ({ name, path }) => {
  return (
    <MenuLink to={path}>
      <Menu text={name} />
    </MenuLink>
  );
};

export default SimpleMenu;
