import React, { useContext, useState } from "react";
import styled from "styled-components";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import GameContext from "../../../contexts/GameContext";
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
    props.value <= props.hoveredValue ? full_star : empty_star});

  &:hover {
    cursor: pointer;
  }
`;

const StarRatings = ({ amountOfStars }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const [requestBody, setRequestBody] = useState({});
  const [hoveredValue, setHoveredValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState(0);
  const {
    game: { appId }
  } = useContext(GameContext);
  const { user } = useContext(UserContext);
  const values = [...Array(amountOfStars).keys()].map(i => i + 1);

  useRequest(`${API_URL}/games/rate`, sendRequest, "PUT", requestBody); // TODO: error handling

  const rateGame = () => {
    setSelectedValue(hoveredValue);
    setRequestBody({
      userId: user.steamId,
      gameId: appId,
      rating: hoveredValue
    });
    setSendRequest(true);
  };

  return (
    <Wrapper>
      {values.map(value => (
        <StarRating
          key={value}
          value={value}
          hoveredValue={hoveredValue}
          onMouseEnter={() => setHoveredValue(value)}
          onMouseLeave={() => setHoveredValue(selectedValue)}
          onClick={rateGame}
        />
      ))}
    </Wrapper>
  );
};

export default StarRatings;
