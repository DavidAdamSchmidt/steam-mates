import React, { useContext } from "react";
import styled from "styled-components";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import LoadingIndicator from "../../common/LoadingIndicator";
import Header from "../../common/Header";
import GameContainer from "./GameContainer";
import { checkPageError } from "../../../utils/errorUtils";
import { getElapsedTimeText } from "../../../utils/updateInfoUtils";
import { organizeByCount } from "../../../utils/gamesUtils";
import tf2_luxury_lounge from "./../../../static/images/tf2_luxury_lounge.png";
import { API_URL } from "../../../constants/api";
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

const GamesOfUserPage = () => {
  const { user } = useContext(UserContext);

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games`,
    true,
    "GET"
  );

  const hasError = checkPageError(status, error);
  if (hasError) {
    return hasError;
  }

  if (loading) {
    return <LoadingIndicator marginTop={"100px"} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Wrapper>
      <Header title="Rating time!" image={tf2_luxury_lounge}>
        <p>
          Welcome to your personal game page! This section contains all your
          games matching <em>at least</em> one of the following Steam tags:{" "}
          <strong>Multiplayer</strong>, <strong>Local Multiplayer</strong>,{" "}
          <strong>Online Co-Op</strong> and <strong>Local Co-Op</strong>.
        </p>
        <p>
          You can organize your games here by rating them on a scale of 1 to 5.
          This will help your friends quickly identify the games you are
          interested in.
        </p>
        <LatestUpdate>
          Your library was updated{" "}
          {getElapsedTimeText(data.latestUpdates[user.steamId])}
        </LatestUpdate>
        <LatestUpdate>
          Tags were updated {getElapsedTimeText(data.latestUpdates["tags"])}
        </LatestUpdate>
      </Header>
      <GameContainer
        data={data.games}
        dataOrganizer={organizeByCount}
        allowRating={true}
      />
    </Wrapper>
  );
};

export default GamesOfUserPage;
