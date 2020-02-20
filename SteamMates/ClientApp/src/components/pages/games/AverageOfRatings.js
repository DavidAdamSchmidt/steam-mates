import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

const AverageOfRatings = ({ ratings }) => {
  const avg =
    ratings.map(x => x.rating).reduce((a, b) => a + b, 0) / ratings.length;

  return <Wrapper>Average: {avg ? avg.toFixed(1) : "N/A"}</Wrapper>;
};

export default AverageOfRatings;
