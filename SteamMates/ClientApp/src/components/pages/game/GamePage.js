import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import GamePageHeader from "./GamePageHeader";
import Description from "./Description";
import Media from "./Media";
import ExtraInfo from "./ExtraInfo";
import Ratings from "./Ratings";
import SystemRequirements from "./SystemRequirements";
import FlexWrapper from "../../common/FlexWrapper";
import { API_URL } from "../../../constants/api";
import { HOME } from "../../../constants/routes";

const Container = styled.div`
  margin-top: -70px;
`;

const Wrapper = styled.span`
  width: 600px;
`;

const GamePage = ({ match }) => {
  const [id, setId] = useState(0);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/${id}?${friends
      .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
      .join("")}`,
    user !== null && id > 0,
    "GET"
  );

  useEffect(() => {
    setId(match.params.id);
  }, [match.params.id]);

  if (user == null || isNaN(id)) {
    return <Redirect to={HOME} />;
  }

  if (loading || !data) {
    return <div>{loading && <span>Loading...</span>}</div>;
  }

  return (
    <Container>
      <GamePageHeader
        id={id}
        name={data.name}
        developers={data.developers}
        publishers={data.publishers}
      />
      <Description title="Short description" text={data.shortDescription} />
      <FlexWrapper>
        <Wrapper>
          <Media movies={data.movies} screenshots={data.screenshots} />
          <ExtraInfo
            releaseDate={data.releaseDate}
            supportedLanguages={data.supportedLanguages}
            controllerSupport={data.controllerSupport}
            website={data.website}
          />
        </Wrapper>
        <Ratings id={id} ratings={data.ratings} />
      </FlexWrapper>
      <Description
        title="Detailed description"
        text={data.detailedDescription}
      />
      <SystemRequirements
        pcRequirements={data.pcRequirements}
        macRequirements={data.macRequirements}
        linuxRequirements={data.linuxRequirements}
      />
    </Container>
  );
};

export default GamePage;
