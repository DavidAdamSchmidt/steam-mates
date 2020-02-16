import React, { useContext, useState } from "react";
import styled from "styled-components";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import full_star from "../../../static/images/full_star.gif";
import empty_star from "../../../static/images/empty_star.gif";
import { API_URL } from "../../../constants/api";

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
    cursor: pointer;
  }
`;

const StarRatings = ({ amountOfStars, gameId, rating }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const [requestBody, setRequestBody] = useState({});
  const [currentValue, setCurrentValue] = useState(rating);
  const [selectedValue, setSelectedValue] = useState(rating);
  const { user } = useContext(UserContext);
  const values = [...Array(amountOfStars).keys()].map(i => i + 1);

  useRequest(`${API_URL}/games/rate`, sendRequest, "PUT", requestBody); // TODO: error handling

  const rateGame = () => {
    setSelectedValue(currentValue);
    setRequestBody({
      userId: user.steamId,
      gameId: gameId,
      rating: currentValue
    });
    setSendRequest(true);
  };

  return (
    <Wrapper>
      {values.map(value => (
        <StarRating
          key={value}
          initialValue={value}
          currentValue={currentValue}
          onMouseEnter={() => setCurrentValue(value)}
          onMouseLeave={() => setCurrentValue(selectedValue)}
          onClick={rateGame}
        />
      ))}
    </Wrapper>
  );
};

export default StarRatings;
