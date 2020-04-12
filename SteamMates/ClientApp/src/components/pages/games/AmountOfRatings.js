import React from "react";
import styled from "styled-components";
import { MEDIUM } from "../../../constants/style";

const Wrapper = styled.div`
  margin: 0 26px;
  width: 100%;
`;

const Title = styled.div`
  margin: 40px 0;
  font-size: 22px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  font-family: Helvetica, sans-serif;
  letter-spacing: 1.1px;
  color: #4e4e4e;

  @media (min-width: 360px) {
    border-bottom: 1.5px solid #4e4e4e;
    line-height: 0.1em;
  }

  @media (${MEDIUM}) {
    border-bottom: 2.5px solid #4e4e4e;
    font-size: 27px;
  }
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
