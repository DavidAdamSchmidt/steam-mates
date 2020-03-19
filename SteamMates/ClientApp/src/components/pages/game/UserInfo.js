import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import StarRatings from "../../common/StarRatings";
import { calculatePlayTime } from "../../../utils/userInfoUtils";
import { FRIENDS } from "../../../constants/routes";
import { PROFILE_URL } from "../../../constants/steam";

const Container = styled.div`
  width: 354px;
  height: 430px;
`;

const AvatarContainer = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background: #48599b;

  &:hover {
    background: #2da258;
  }
`;

const Anchor = styled.a`
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;

const Avatar = styled.img`
  margin: 5px;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px 170px;
  grid-column-gap: 10px;
  margin: 20px 0;
`;

const Wrapper = styled.div`
  padding-top: 6px;
  width: 170px;
`;

const PlayTime = styled.div`
  margin: 10px 0 0 6px;
  font-weight: bold;
  letter-spacing: 0.8px;
  color: #414141;
`;

const NotOwned = styled.div`
  margin: 22px 0 0 7px;
  font-size: 18px;
  font-weight: bold;
  color: #da0000;
`;

const Tip = styled.div`
  font-size: 17px;
  font-weight: bold;
`;

const UserInfo = ({ id, info }) => {
  return (
    <Container>
      <SectionTitle>User info</SectionTitle>
      {info.map((x, index) => (
        <Row key={x.steamId}>
          <AvatarContainer>
            <Anchor
              href={`${PROFILE_URL}/${x.steamId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar src={x.avatarFull} />
            </Anchor>
          </AvatarContainer>
          <Wrapper>
            {(x.rating || x.hasGame) && (
              <>
                <StarRatings
                  amountOfStars={5}
                  rating={x.rating}
                  gameId={id}
                  frozen={index}
                />
                <PlayTime>
                  Played {calculatePlayTime(x.playTime)} hours
                </PlayTime>
              </>
            )}
            {!x.hasGame && (
              <NotOwned>
                {x.privateLibrary ? "Private Library" : "Not Owned"}
              </NotOwned>
            )}
          </Wrapper>
        </Row>
      ))}
      {info.length === 1 && (
        <Tip>
          <Link to={FRIENDS}>Select</Link> up to 3 friends to compare your
          rating with
        </Tip>
      )}
    </Container>
  );
};

export default UserInfo;
