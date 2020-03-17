import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px 0;
`;

const Header = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Description = ({ data }) => {
  return (
    <Container>
      <Header>About the game</Header>
      <div>{data.shortDescription}</div>
    </Container>
  );
};

export default Description;
