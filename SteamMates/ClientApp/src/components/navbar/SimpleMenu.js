import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const MenuLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  width: 100%;

  ${({ disabled }) =>
    disabled
      ? css`
          pointer-events: none;
        `
      : css`
          &:hover {
            background: darkgreen;
            cursor: pointer;
          }
        `}
`;

const SimpleMenu = ({ name, path, disabled, callback }) => {
  return (
    <MenuLink to={path} disabled={disabled} onClick={callback}>
      <Menu text={name} disabled={disabled} clickable={true} />
    </MenuLink>
  );
};

export default SimpleMenu;
