import React, { useContext, useState } from "react";
import styled from "styled-components";
import GameContext from "../../../contexts/GameContext";
import full_star from "../../../static/images/full_star.gif";
import empty_star from "../../../static/images/empty_star.gif";

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
  const [hoveredValue, setHoveredValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState(0);
  const {
    game: { appId }
  } = useContext(GameContext);
  const values = [...Array(amountOfStars).keys()].map(i => i + 1);

  const rateGame = () => {
    setSelectedValue(hoveredValue);
    console.log(`${appId}: ${hoveredValue}`);

    // TODO: send request to server
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
