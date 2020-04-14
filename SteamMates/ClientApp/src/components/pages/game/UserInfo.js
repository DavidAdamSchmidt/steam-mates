import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import FriendContext from "../../../contexts/FriendContext";
import SectionTitle from "./SectionTitle";
import StarRatings from "../../common/StarRatings";
import { calculatePlayTime } from "../../../utils/gameUtils";
import { FRIENDS } from "../../../constants/routes";
import { PROFILE_URL } from "../../../constants/steam";
import { MEDIUM, BIG } from "../../../constants/style";

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;

  @media (${MEDIUM}) {
    display: initial;
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 80px auto;
  grid-column-gap: 8.88vw;
  flex-basis: 100%;
  flex-grow: 0;
  margin: 10px 0;
  overflow: hidden;

  ${({ hasFriends }) =>
    hasFriends &&
    css`
      @media (min-width: 450px) {
        grid-template-columns: 10.43vw auto;
        grid-column-gap: 5.21vw;
        flex-basis: 50%;
        margin: 2.6vw 0;
    `};

  @media (${MEDIUM}) {
    grid-template-columns: 7vw auto;
    grid-column-gap: 3.47vw;
    margin: 1.68vw 0;
  }

  @media (${BIG}) {
    grid-template-columns: 80px auto;
    grid-column-gap: 40px;
    margin: 20px 0;
  }
`;

const AvatarContainer = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background: #48599b;

  &:hover {
    background: #2da258;
  }

  ${({ hasFriends }) =>
    hasFriends &&
    css`
      @media (min-width: 450px) {
        width: 10.43vw;
        height: 10.43vw;
      }
    `};

  @media (${MEDIUM}) {
    width: 7vw;
    height: 7vw;
  }

  @media (${BIG}) {
    width: 80px;
    height: 80px;
  }
`;

const Anchor = styled.a`
  display: inline-block;
  border-radius: 50px;
  width: 100%;
  height: 100%;
`;

const Avatar = styled.img`
  margin: 6.25%;
  border-radius: 50%;
  width: 87.5%;
  height: 87.5%;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const RatingWrapper = styled.div`
  width: 170px;
  height: 32px;

  ${({ hasFriends }) =>
    hasFriends &&
    css`
      @media (min-width: 450px) {
        width: 22.16vw;
        height: 4.17vw;
      }
    `};

  @media (${MEDIUM}) {
    width: 14.91vw;
    height: 2.72vw;
  }

  @media (${BIG}) {
    width: 170px;
    height: 32px;
  }
`;

const PlayTime = styled.div`
  width: 100%;
  padding: 1.3vw 0 0 7px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.8px;
  color: #414141;

  @media (min-width: 450px) {
    width: 75%;
  }

  @media (${MEDIUM}) {
    width: 100%;
    padding-top: 0.84vw;
  }

  @media (${BIG}) {
    padding-top: 10px;
    font-size: 16px;
  }
`;

const NotOwned = styled.div`
  padding-left: 7px;
  font-size: 16px;
  font-weight: bold;
  color: #da0000;

  @media (${BIG}) {
    font-size: 18px;
  }
`;

const Tip = styled.div`
  margin: 20px 0;
  font-size: 17px;
  font-weight: bold;
`;

const UserInfo = ({ id, info }) => {
  const { friends } = useContext(FriendContext);

  return (
    <div>
      <SectionTitle>User info</SectionTitle>
      <MainWrapper>
        {info.map((x, index) => (
          <Row key={x.steamId} hasFriends={friends.length}>
            <AvatarContainer hasFriends={friends.length}>
              <Anchor
                href={`${PROFILE_URL}/${x.steamId}`}
                target="_blank"
                rel="noopener noreferrer"
                hasFriends={friends.length}
              >
                <Avatar src={x.avatarFull} />
              </Anchor>
            </AvatarContainer>
            <Info>
              {(x.rating || x.hasGame) && (
                <span>
                  <RatingWrapper hasFriends={friends.length}>
                    <StarRatings
                      amountOfStars={5}
                      rating={x.rating}
                      gameId={id}
                      frozen={index}
                    />
                  </RatingWrapper>
                  <PlayTime>
                    Played {calculatePlayTime(x.playTime)} hours
                  </PlayTime>
                </span>
              )}
              {!x.hasGame && (
                <NotOwned>
                  {x.privateLibrary ? "Private Library" : "Not Owned"}
                </NotOwned>
              )}
            </Info>
          </Row>
        ))}
      </MainWrapper>
      {info.length === 1 && (
        <Tip>
          <Link to={FRIENDS}>Select</Link> up to 3 friends to compare your
          rating with
        </Tip>
      )}
    </div>
  );
};

export default UserInfo;
