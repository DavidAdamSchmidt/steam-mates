import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import SectionTitle from "./SectionTitle";

const GlobalStyle = createGlobalStyle`
  p + br, h1 + br, h2 + br {
    display: none;
  }
`;

const Container = styled.div`
  margin: 30px 0;
`;

const Description = ({ title, text }) => {
  return (
    <Container>
      <GlobalStyle />
      <SectionTitle>{title}</SectionTitle>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </Container>
  );
};

export default Description;
