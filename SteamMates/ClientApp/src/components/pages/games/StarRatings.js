import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import Error from "./Error";
import full_star from "../../../static/images/full_star.gif";
import empty_star from "../../../static/images/empty_star.gif";
import { API_URL } from "../../../constants/api";
import { DATABASE_ERROR } from "../../../constants/request";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 32px;
  padding: 14px 0;
`;

const StarRating = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  background-size: contain;
  background-image: url(${props =>
    props.initialValue <= props.currentValue ? full_star : empty_star});

  &:hover {
  ${({ changeable }) =>
    changeable &&
    css`
      cursor: pointer;
    `}
`;

const StarRatings = ({ amountOfStars, gameId, rating, frozen }) => {
  const [requestBody, setRequestBody] = useState({});
  const [sendRequest, setSendRequest] = useState(false);
  const [databaseError, setDatabaseError] = useState(false);
  const [currentValue, setCurrentValue] = useState(rating);
  const [selectedValue, setSelectedValue] = useState(rating);
  const [previousValue, setPreviousValue] = useState(rating);
  const { user } = useContext(UserContext);
  const values = [...Array(amountOfStars).keys()].map(i => i + 1);

  const [, status, , error] = useRequest(
    `${API_URL}/games/rate`,
    sendRequest,
    "PUT",
    requestBody
  );

  useEffect(() => {
    setDatabaseError(
      status === 500 && (error || {}).message === DATABASE_ERROR
    );
  }, [status, error]);

  const rateGame = () => {
    if (selectedValue === currentValue) {
      return;
    }

    setPreviousValue(selectedValue);
    setSelectedValue(currentValue);
    setRequestBody({
      userId: user.steamId,
      gameId: gameId,
      rating: currentValue
    });
    setSendRequest(true);
  };

  if (databaseError && selectedValue !== previousValue) {
    setSelectedValue(previousValue);
    setCurrentValue(previousValue);
  }

  return (
    <Wrapper>
      {databaseError && <Error message="Database Error" />}
      {values.map(value =>
        frozen ? (
          <StarRating
            key={value}
            initialValue={value}
            currentValue={currentValue}
          />
        ) : (
          <StarRating
            key={value}
            initialValue={value}
            currentValue={currentValue}
            changeable={true}
            onMouseEnter={() => setCurrentValue(value)}
            onMouseLeave={() => setCurrentValue(selectedValue)}
            onClick={rateGame}
          />
        )
      )}
    </Wrapper>
  );
};

export default StarRatings;
