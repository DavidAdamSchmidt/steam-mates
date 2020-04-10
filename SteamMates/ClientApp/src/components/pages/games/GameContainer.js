import React, { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import AmountOfRatings from "./AmountOfRatings";
import GameCard from "./GameCard";
import LoadingIndicator from "../../common/LoadingIndicator";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 25px;
`;

const SpinnerWrapper = styled.div`
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
      {data.slice(0, amount).map((info, index) => (
        <Fragment key={info.game.appId}>
          {info.title && <AmountOfRatings text={info.title} />}
          {info.title && adjustAmount(index)}
          <GameCard info={info} />
        </Fragment>
      ))}
      {amount < data.length && (
        <SpinnerWrapper>{isLoading && <LoadingIndicator />}</SpinnerWrapper>
      )}
    </Wrapper>
  );
};

export default GameContainer;
