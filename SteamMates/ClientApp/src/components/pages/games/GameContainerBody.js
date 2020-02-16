import React from "react";
import styled from "styled-components";
import GameContext from "../../../contexts/GameContext";
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
        <GameContext.Provider key={info.game.appId} value={info}>
          <GameCard />
        </GameContext.Provider>
      ))}
    </Wrapper>
  );
};

export default GameContainerBody;
