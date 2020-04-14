import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import RequestHandler from "../../RequestHandler";
import Header from "../../common/Header";
import GameContainer from "./GameContainer";
import { showError, getLibraryError } from "../../../utils/errorUtils";
import { getElapsedTimeText } from "../../../utils/sharedUtils";
import {
  addAverageOfRatings,
  organizeByRatingCount
} from "../../../utils/gamesUtils";
import tf2_high_five from "./../../../static/images/tf2_high_five.png";
import tf2_spy_shocked from "./../../../static/images/tf2_spy_shocked.png";
import { API_URL } from "../../../constants/api";
import { HOME } from "../../../constants/routes";
import { MEDIUM } from "../../../constants/style";

const Wrapper = styled.div`
  @media (${MEDIUM}) {
    margin-top: 100px;
  }
`;

const LatestUpdate = styled.p`
  margin: 5px 0;
  font-size: 14px;
  font-style: italic;
  color: #a4a4a4;
`;

const GamesInCommonPage = () => {
  const [sendRequest, setSendRequest] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [privateProfiles, setPrivateProfiles] = useState([]);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const request = useRequest(
    `${API_URL}/games/common?${queryString}`,
    sendRequest,
    "GET"
  );
  const { data } = request;

  useEffect(() => {
    setPrivateProfiles(friends.filter(x => x.communityVisibilityState === 1));
  }, [friends]);

  useEffect(() => {
    if (friends && privateProfiles.length === 0) {
      setQueryString(
        `${friends
          .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
          .join("")}`
      );
      setSendRequest(true);
    }
  }, [friends, privateProfiles]);

  if (friends.length === 0) {
    return <Redirect to={HOME} />;
  }

  if (privateProfiles.length > 0) {
    return showError(getLibraryError(privateProfiles));
  }

  const displayLatestUpdates = () => {
    return (
      <>
        <LatestUpdate>
          Your library was updated{" "}
          {getElapsedTimeText(data.latestUpdates[user.steamId])}
        </LatestUpdate>
        {friends.map(friend => (
          <LatestUpdate key={friend.steamId}>
            {friend.personaName}'s library was updated{" "}
            {getElapsedTimeText(data.latestUpdates[friend.steamId])}
          </LatestUpdate>
        ))}
        <LatestUpdate>
          Tags were updated {getElapsedTimeText(data.latestUpdates["tags"])}
        </LatestUpdate>
      </>
    );
  };

  if (data) {
    addAverageOfRatings(data.games);
  }

  return (
    <RequestHandler request={request}>
      {data && (
        <Wrapper>
          {data.games.length ? (
            <>
              <Header title="It's a match!" image={tf2_high_five}>
                <p>
                  Welcome to the <em>games in common</em> page! This section
                  contains all the games you and your selected friends can play
                  together based on the following Steam tags:{" "}
                  <strong>Multiplayer</strong>,{" "}
                  <strong>Local Multiplayer</strong>,{" "}
                  <strong>Online Co-Op</strong> and <strong>Local Co-Op</strong>
                  .
                </p>
                <p>
                  Games are grouped together by amount of ratings to get the
                  most relevant results on top.
                </p>
                {displayLatestUpdates()}
              </Header>
              <GameContainer
                data={data.games}
                dataOrganizer={organizeByRatingCount}
              />
            </>
          ) : (
            <Header title=":(" image={tf2_spy_shocked}>
              <p>
                No match were found with{" "}
                {friends.length === 1 ? "this friend" : "these friends"}. Try
                another combination.
              </p>
              {displayLatestUpdates()}
            </Header>
          )}
        </Wrapper>
      )}
    </RequestHandler>
  );
};

export default GamesInCommonPage;
