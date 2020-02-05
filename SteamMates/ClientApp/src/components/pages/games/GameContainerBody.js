import React from "react";
import styled from "styled-components";
import GameLogo from "./GameLogo";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  line-height: 50px;
`;

const GameContainerBody = ({ data }) => {
  return (
    <Wrapper>
      {data.map(stat => (
        <GameLogo key={stat.game.appId} game={stat.game} />
      ))}
    </Wrapper>
  );
};

export default GameContainerBody;
