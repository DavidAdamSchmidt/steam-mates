import React from "react";
import styled, { css } from "styled-components";

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  user-select: none;

  ${({ disabled }) =>
    disabled
      ? css`
          color: #a5a5a5;
        `
      : css`
          color: #393939;
        `};

  &:hover {
    background: darkgreen;
    cursor: pointer;
    color: white;
  }

  ${({ clickable }) =>
    !clickable &&
    css`
      &:hover {
        cursor: default;
      }
    `}

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      color: #b1b1b1;
    }
  `}
`;

const Menu = ({ text, disabled, clickable }) => {
  return (
    <Text disabled={disabled} clickable={clickable}>
      {text}
    </Text>
  );
};

export default Menu;
