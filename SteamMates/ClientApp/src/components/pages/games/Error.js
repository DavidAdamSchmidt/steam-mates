import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  position: fixed;
  z-index: 1;
  top: 200px;
  right: 0;
  border-radius: 5px;
  padding: 20px;
  background: #f2dede;
  color: #ba3a1e;
`;

const Error = ({ message }) => {
  return <Wrapper>{message}</Wrapper>;
};

export default Error;
