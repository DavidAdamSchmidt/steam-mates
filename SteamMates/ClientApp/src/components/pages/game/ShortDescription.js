import React from "react";
import styled from "styled-components";
import SectionTitle from "./SectionTitle";

const Container = styled.div`
  margin: 30px 0;
`;

const Description = styled.div`
  line-height: 1.6;
`;

const ShortDescription = ({ description }) => {
  return (
    <Container>
      <SectionTitle>About the game</SectionTitle>
      <Description dangerouslySetInnerHTML={{ __html: description }} />
    </Container>
  );
};

export default ShortDescription;
