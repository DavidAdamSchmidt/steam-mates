import React, { useState } from "react";
import styled, { css } from "styled-components";
import GameCardMenu from "./GameCardMenu";
import StarRatings from "../../common/StarRatings";
import AverageOfRatings from "./AverageOfRatings";
import { getGameCardBackgroundColor } from "../../../utils/gamesInCommonUtils";
import game_card_default from "./../../../static/images/game_card_default.jpg";
import { IMAGE_ROOT, LOGO_URL } from "../../../constants/steam";

const Wrapper = styled.div`
  position: relative;
  margin: 14px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  width: 184px;
  padding: 24px;
  background: ${props => getGameCardBackgroundColor(props.avg)};
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

const ImageContainer = styled.div`
  width: 184px;
  height: 276px;

  ${({ logoUsed }) =>
    logoUsed &&
    css`
      position: relative;
      background: linear-gradient(to right bottom, grey, rgba(128, 128, 128, 0)),
        url(${game_card_default}) center;
    `}
`;

const Image = styled.img`
  width: 100%;

  ${({ logoUsed }) =>
    logoUsed &&
    css`
      position: absolute;
      top: 55px;
    `}
`;

const RatingWrapper = styled.div`
  margin: 14px 0;
  height: 32px;
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

const GameCard = ({ info }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hasBigImage, setHasBigImage] = useState(true);

  return (
    <Wrapper avg={info.averageOfRatings}>
      <Title>{info.game.name}</Title>
      <Icon
        onClick={() => setShowMenu(true)}
        src={`${LOGO_URL}/${info.game.appId}/${info.game.imgIconUrl}.jpg`}
        alt="GameIcon"
      />
      {showMenu && (
        <GameCardMenu
          id={info.game.appId}
          closeMenu={() => setShowMenu(false)}
        />
      )}
      <ImageContainer logoUsed={!hasBigImage}>
        <Image
          logoUsed={!hasBigImage}
          src={
            hasBigImage
              ? `${IMAGE_ROOT}/${info.game.appId}/library_600x900.jpg`
              : `${LOGO_URL}/${info.game.appId}/${info.game.imgLogoUrl}.jpg`
          }
          alt="GameLogo"
          onError={() => setHasBigImage(false)}
        />
      </ImageContainer>
      {info.rating !== undefined && (
        <RatingWrapper>
          <StarRatings
            amountOfStars={5}
            gameId={info.game.appId}
            rating={info.rating}
          />
        </RatingWrapper>
      )}
      {info.ratings && <AverageOfRatings avg={info.averageOfRatings} />}
      {info.tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </Wrapper>
  );
};

export default GameCard;
