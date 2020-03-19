import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import StarRatings from "../../common/StarRatings";
import { calculatePlayTime } from "../../../utils/userInfoUtils";
import { FRIENDS } from "../../../constants/routes";
import { PROFILE_URL } from "../../../constants/steam";

const Container = styled.div`
  height: 430px;
  width: 354px;
`;

const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #444e91;
`;

const Avatar = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px 170px;
  grid-column-gap: 10px;
  margin: 20px 0;
`;

const Wrapper = styled.div`
  width: 170px;
  padding-top: 6px;
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
            <a
              href={`${PROFILE_URL}/${x.steamId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar src={x.avatarFull} />
            </a>
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
