import React from "react";
import styled from "styled-components";
import GameCard from "./GameCard";
import AmountOfRatings from "./AmountOfRatings";

const Wrapper = styled.div`
  margin: 50px 0 50px;
`;

const GameCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
`;

const GameContainerBody = ({ data, title }) => {
  return (
    <Wrapper>
      {title && <AmountOfRatings text={title} />}
      <GameCardContainer>
        {data.map(info => (
          <GameCard key={info.game.appId} info={info} />
        ))}
      </GameCardContainer>
    </Wrapper>
  );
};

export default GameContainerBody;
