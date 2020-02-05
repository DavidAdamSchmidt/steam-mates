import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.span`
  position: absolute;
  z-index: 2;
  top: -5px;
  left: 105%;
  display: none;
  visibility: hidden;
  background: rgba(72, 70, 119, 0.9);
  color: white;

  ${Wrapper}:hover & {
    display: block;
    visibility: visible;
    height: 22px;
    min-width: 120px;
    padding: 10px 20px;
    border-radius: 5px;
    white-space: nowrap;
  }
`;

const Tooltip = ({ text, children }) => {
  return (
    <Wrapper>
      {children}
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default Tooltip;
