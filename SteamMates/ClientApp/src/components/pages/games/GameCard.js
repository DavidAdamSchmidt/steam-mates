import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import TagContext from "../../../contexts/TagContext";
import StarRatings from "../../common/StarRatings";
import { getGameCardBackgroundColor } from "../../../utils/gamesInCommonUtils";
import game_card_default from "./../../../static/images/game_card_default.jpg";
import { IMAGE_ROOT, LOGO_URL } from "../../../constants/steam";
import { GAMES } from "../../../constants/routes";

const Wrapper = styled.div`
  margin: 14px;
`;

const side = css`
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.9s;
  backface-visibility: hidden;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: ${({ rating }) => getGameCardBackgroundColor(rating)};
`;

const Front = styled.div`
  ${side};

  padding: 24px;
`;

const Back = styled.div`
  ${side};

  transform: rotateY(-180deg);
`;

const Card = styled.div`
  position: relative;
  perspective: 2500px;
  width: 232px;
  height: 368px;

  &:hover ${Front} {
    transform: rotateY(180deg);
  }

  &:hover ${Back} {
    transform: rotateY(0);
  }
`;

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 5px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  width: 166px;
  height: 34px;
`;

const Icon = styled.img`
  position: absolute;
  top: 9px;
  right: 9px;
  box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.5);
  border-radius: 100%;
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

const Logo = styled.div.attrs(({ id }) => ({
  style: {
    backgroundImage: `url(${IMAGE_ROOT}/${id}/logo.png)`
  }
}))`
  box-sizing: border-box;
  padding: 24px;
  height: 120px;
  width: 100%;
  background-origin: content-box;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Body = styled.div`
  height: 208px;
  background: ${({ rating }) => getGameCardBackgroundColor(rating)};
  text-align: center;
`;

const RatingWrapper = styled.div`
  margin: auto;
  width: 180px;
  height: 32px;
  padding: 24px 0;
`;

const Users = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 24px 0;

  ${({ even }) =>
    even &&
    css`
      margin-left: 1px;
      width: 230px;
    `}
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  border: 2px solid silver;
  width: 36px;
  height: 36px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 36px;
  vertical-align: top;
`;

const Rating = styled.div`
  position: absolute;
  top: -10px;
  left: 20px;
  border: 2px solid silver;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background: black;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
  text-align: center;
  color: white;
  user-select: none;
`;

const Button = styled(Link)`
  width: 60px;

  &:link,
  &:visited {
    display: inline-block;
    padding: 6px 20px;
    border-radius: 100px;
    background: white;
    text-transform: uppercase;
    text-decoration: none;
    color: #777;
  }
`;

const Tags = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 96px);
  grid-template-rows: repeat(2, 50%);
  grid-row-gap: 4px;
  padding: 24px 20px;
`;

const Tag = styled.span`
  font-size: 10px;
  text-align: left;
  color: white;
`;

const Footer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 14px;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  color: ${({ color }) => color};
`;

const GameCard = ({ info }) => {
  const [rating, setRating] = useState(
    info.rating ? info.rating : info.averageOfRatings
  );
  const [hasBigImage, setHasBigImage] = useState(true);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { initialTagsState } = useContext(TagContext);

  return (
    <Wrapper>
      <Card>
        <Front rating={rating}>
          <Title>{info.game.name}</Title>
          <Icon
            src={`${LOGO_URL}/${info.game.appId}/${info.game.imgIconUrl}.jpg`}
            alt="GameIcon"
          />
          <ImageContainer logoUsed={!hasBigImage}>
            <Image
              logoUsed={!hasBigImage}
              src={
                hasBigImage
                  ? `${IMAGE_ROOT}/${info.game.appId}/library_600x900.jpg`
                  : `${LOGO_URL}/${info.game.appId}/${info.game.imgLogoUrl}.jpg`
              }
              onError={() => setHasBigImage(false)}
            />
          </ImageContainer>
        </Front>
        <Back rating={rating}>
          <Logo id={info.game.appId} />
          <Body>
            {info.rating !== undefined && (
              <RatingWrapper>
                <StarRatings
                  amountOfStars={5}
                  gameId={info.game.appId}
                  rating={info.rating}
                  setRating={setRating}
                />
              </RatingWrapper>
            )}
            {info.ratings && (
              <Users even={friends.length % 2}>
                {[user, ...friends].map(x => (
                  <AvatarContainer key={x.steamId}>
                    <Avatar src={x.avatarFull} />
                    <Rating>
                      {(info.ratings.find(r => r.userId === x.steamId) || {})
                        .rating || "?"}
                    </Rating>
                  </AvatarContainer>
                ))}
              </Users>
            )}
            <Button to={`${GAMES}/${info.game.appId}`}>Page</Button>
            <Tags>
              {initialTagsState.map(tag => (
                <Tag key={tag}>
                  {tag}{" "}
                  {info.tags.includes(tag) ? (
                    <span>&#10003;</span>
                  ) : (
                    <span>&#10006;</span>
                  )}
                </Tag>
              ))}
            </Tags>
          </Body>
          <Footer
            color={
              rating >= 3.5 ? "#e3e3e3" : rating >= 1.5 ? "#696969" : "silver"
            }
          >
            {info.game.name}
          </Footer>
        </Back>
      </Card>
    </Wrapper>
  );
};

export default GameCard;
