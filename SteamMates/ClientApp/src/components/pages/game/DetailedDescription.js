import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import SectionTitle from "./SectionTitle";

const GlobalStyle = createGlobalStyle`
  p + br, h1 + br, h2 + br {
    display: none;
  }
`;

const Container = styled.div`
  margin-top: 30px;
`;

const DetailedDescription = ({ data }) => {
  return (
    <Container>
      <GlobalStyle />
      <SectionTitle>Detailed description</SectionTitle>
      <div dangerouslySetInnerHTML={{ __html: data.detailedDescription }} />
    </Container>
  );
};

export default DetailedDescription;
