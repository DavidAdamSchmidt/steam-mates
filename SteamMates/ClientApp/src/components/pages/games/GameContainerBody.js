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
      {data.map(info => (
        <GameCard key={info.game.appId} info={info} />
      ))}
    </Wrapper>
  );
};

export default GameContainerBody;
