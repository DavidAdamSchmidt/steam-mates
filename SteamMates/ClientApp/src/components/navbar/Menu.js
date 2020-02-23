import React from "react";
import styled from "styled-components";

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

const Menu = ({ text }) => {
  return <Text>{text}</Text>;
};

export default Menu;
