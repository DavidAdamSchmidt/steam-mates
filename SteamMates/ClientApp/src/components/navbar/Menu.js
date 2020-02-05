import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuLink = styled(Link)`
  text-decoration: none;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  color: #b1b1b1;

  &:hover {
    background: darkgreen;
    cursor: pointer;
    color: white;
  }
`;

const Menu = ({ name }) => {
  return (
    <MenuLink to={`/${name.toLowerCase()}`}>
        <Text>{name ? name : "Home"}</Text>
    </MenuLink>
  );
};

export default Menu;
