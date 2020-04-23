import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useRequest from "../../hooks/useRequest";
import UserContext from "../../contexts/UserContext";
import { showError } from "../../utils/errorUtils";
import full_star from "../../static/images/full_star.gif";
import empty_star from "../../static/images/empty_star.gif";
import { ERROR, API_ROOT } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;

const StarRating = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-image: url(${props =>
    props.initialValue <= props.currentValue ? full_star : empty_star});
  background-repeat: no-repeat;
  background-position: center;
  
  &:hover {
  ${({ changeable }) =>
    changeable &&
    css`
      cursor: pointer;
    `}
`;

const StarRatings = ({
  amountOfStars,
  gameId,
  rating,
  frozen,
  size,
  setRating
}) => {
  const [requestBody, setRequestBody] = useState({});
  const [sendRequest, setSendRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentValue, setCurrentValue] = useState(rating);
  const [selectedValue, setSelectedValue] = useState(rating);
  const { user } = useContext(UserContext);
  const values = [...Array(amountOfStars).keys()].map(i => i + 1);

  const { status, error } = useRequest(
    `${API_ROOT}/games/rate`,
    sendRequest,
    "PUT",
    requestBody
  );

  useEffect(() => {
    if (status === 500 && (error || {}).message === ERROR.DATABASE_ERROR) {
      setErrorMessage("Database error. Your rating has not been saved.");
    } else if (status && status !== 201 && status !== 204) {
      setErrorMessage(
        "An unknown error has occurred. Your rating may not have been saved."
      );
    }
  }, [status, error]);

  useEffect(() => {
    if (setRating && sendRequest) {
      setRating(selectedValue);
    }
  }, [setRating, sendRequest, selectedValue]);

  const rateGame = () => {
    if (selectedValue === currentValue) {
      return;
    }

    setSelectedValue(currentValue);
    setRequestBody({
      userId: user.steamId,
      gameId: gameId,
      rating: currentValue
    });
    setSendRequest(true);
  };

  if (errorMessage) {
    return showError(errorMessage);
  }

  return (
    <Wrapper size={size}>
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
