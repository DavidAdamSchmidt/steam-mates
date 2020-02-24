import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 26px;
`;

const Title = styled.div`
  margin: 40px 0;
  border-bottom: 2.5px solid #4e4e4e;
  font-size: 27px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  font-family: Helvetica, sans-serif;
  line-height: 0.1em;
  letter-spacing: 1.1px;
  color: #4e4e4e;
`;

const Inner = styled.span`
  padding: 0 10px;
  background: #f3f3f3;
`;

const AmountOfRatings = ({ text }) => {
  return (
    <Wrapper>
      <Title>
        <Inner>{text}</Inner>
      </Title>
    </Wrapper>
  );
};

export default AmountOfRatings;
