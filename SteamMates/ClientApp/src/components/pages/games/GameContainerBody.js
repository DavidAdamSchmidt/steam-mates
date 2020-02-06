import React from "react";
import styled from "styled-components";
import GameCard from "./GameCard";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const GameContainerBody = ({ data }) => {
  return (
    <Wrapper>
      {data.map(stat => (
        <GameCard key={stat.game.appId} stat={stat} />
      ))}
    </Wrapper>
  );
};

export default GameContainerBody;
