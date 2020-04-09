import React, { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import AmountOfRatings from "./AmountOfRatings";
import GameCard from "./GameCard";
import SpinnerIcon from "../../common/SpinnerIcon";

const Wrapper = styled.div`
  margin: 100px 0 25px 0;
`;

const GameCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
`;

const GameContainer = ({ data }) => {
  const increaseAmount = () => {
    setIsLoading(false);
    setAmount(prevState => prevState + 32);
  };

  const [amount, setAmount] = useState(32);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isLoading, setIsLoading] = useInfiniteScroll(
    amount < data.length,
    useCallback(increaseAmount, [])
  );

  const adjustAmount = titleIndex => {
    if (titleIndex > currentTitleIndex) {
      setCurrentTitleIndex(titleIndex);
      setAmount(prevState => prevState + (titleIndex % 4));
    }
  };

  return (
    <Wrapper>
      <GameCardContainer>
        {data.slice(0, amount).map((info, index) => (
          <Fragment key={info.game.appId}>
            {info.title && <AmountOfRatings text={info.title} />}
            {info.title && adjustAmount(index)}
            <GameCard info={info} />
          </Fragment>
        ))}
        {amount < data.length && (
          <SpinnerWrapper>{isLoading && <SpinnerIcon />}</SpinnerWrapper>
        )}
      </GameCardContainer>
    </Wrapper>
  );
};

export default GameContainer;
