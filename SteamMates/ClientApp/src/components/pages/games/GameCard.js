import React from "react";
import styled from "styled-components";
import { LOGO_URL } from "../../../constants/steam";

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 25px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  width: 184px;
  padding: 24px;
  background: rgba(0, 0, 39, 0.69);
`;

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: bold;
  color: white;
  width: 166px;
  height: 34px;
  padding-bottom: 5px;
`;

const Icon = styled.img`
  position: absolute;
  top: 9px;
  right: 9px;
  box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.5);
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const Tag = styled.span`
  display: inline-block;
  margin-top: 10px;
  margin-right: 6px;
  border-radius: 10px;
  padding: 6px;
  background: #62a7ff;
  font-size: 10px;
  color: white;

  &:last-of-type {
    margin-right: 0;
  }
`;

const GameCard = ({ stat }) => {
  return (
    <Wrapper>
      <Title>{stat.game.name}</Title>
      <a href={`steam://run/${stat.game.appId}`}>
        <Icon
          src={`${LOGO_URL}/${stat.game.appId}/${stat.game.imgIconUrl}.jpg`}
          alt="GameIcon"
        />
      </a>
      <img
        src={`${LOGO_URL}/${stat.game.appId}/${stat.game.imgLogoUrl}.jpg`}
        alt="GameLogo"
      />
      {stat.tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </Wrapper>
  );
};

export default GameCard;