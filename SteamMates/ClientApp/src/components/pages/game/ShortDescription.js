import React from "react";
import styled from "styled-components";
import SectionTitle from "./SectionTitle";

const Container = styled.div`
  margin: 30px 0;
`;

const ShortDescription = ({ description }) => {
  return (
    <Container>
      <SectionTitle>About the game</SectionTitle>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Container>
  );
};

export default ShortDescription;
