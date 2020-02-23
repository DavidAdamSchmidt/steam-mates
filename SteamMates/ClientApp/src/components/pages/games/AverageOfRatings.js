import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

const AverageOfRatings = ({ avg }) => {
  return <Wrapper>Average: {isNaN(avg) ? "N/A" : avg.toFixed(1)}</Wrapper>;
};

export default AverageOfRatings;
