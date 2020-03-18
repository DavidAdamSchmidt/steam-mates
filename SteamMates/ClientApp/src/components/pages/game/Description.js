import React from "react";
import styled from "styled-components";
import SectionTitle from "./SectionTitle";

const Container = styled.div`
  padding: 30px 0;
`;

const Description = ({ data }) => {
  return (
    <Container>
      <SectionTitle>About the game</SectionTitle>
      <div>{data.shortDescription}</div>
    </Container>
  );
};

export default Description;
