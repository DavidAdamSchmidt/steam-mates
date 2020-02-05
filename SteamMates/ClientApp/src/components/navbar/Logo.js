import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
  color: white;
`;

const Logo = () => {
  return <Wrapper>SteamMates</Wrapper>;
};

export default Logo;
