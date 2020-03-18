import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import SectionTitle from "./SectionTitle";
import StarRatings from "../../common/StarRatings";
import { FRIENDS } from "../../../constants/routes";
import { PROFILE_URL } from "../../../constants/steam";

const Container = styled.div`
  height: 430px;
  width: 410px;
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
  margin: 10px 0;
`;

const StarWrapper = styled.div`
  width: 170px;
  padding-top: 6px;
`;

const Tip = styled.div`
  margin-top: 30px;
  font-size: 17px;
  font-weight: bold;
`;

const Ratings = ({ data }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const profiles = [user, ...friends];

  return (
    <Container>
      <SectionTitle>Ratings</SectionTitle>
      {profiles.map((profile, index) => (
        <Row key={profile.steamId}>
          <AvatarContainer>
            <a
              href={`${PROFILE_URL}/${profile.steamId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar src={profile.avatarFull} />
            </a>
          </AvatarContainer>
          <StarWrapper>
            <StarRatings
              amountOfStars={5}
              rating={
                (data.ratings.find(x => x.userId === profile.steamId) || {})
                  .rating
              }
              gameId={data.steamId}
              frozen={index}
            />
          </StarWrapper>
        </Row>
      ))}
      {friends.length === 0 && (
        <Tip>
          <Link to={FRIENDS}>Select</Link> up to 3 friends to compare your
          rating with
        </Tip>
      )}
    </Container>
  );
};

export default Ratings;
