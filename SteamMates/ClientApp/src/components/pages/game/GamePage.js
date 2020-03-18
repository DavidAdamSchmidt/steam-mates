import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import GamePageHeader from "./GamePageHeader";
import Description from "./Description";
import Media from "./Media";
import ExtraInfo from "./ExtraInfo";
import Ratings from "./Ratings";
import DetailedDescription from "./DetailedDescription";
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

const GamePage = () => {
  const [id, setId] = useState(0);
  const history = useHistory();
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
    const query = new URLSearchParams(history.location.search);
    const param = parseInt(query.get("id"));

    if (isNaN(param)) {
      history.goBack();
    }

    setId(param);
  }, [history]);

  if (user == null) {
    return <Redirect to={HOME} />;
  }

  if (loading || !data) {
    return <div>{loading && <span>Loading...</span>}</div>;
  }

  return (
    <Container>
      <GamePageHeader data={data} />
      <Description data={data} />
      <FlexWrapper>
        <Wrapper>
          <Media data={data} />
          <ExtraInfo data={data} />
        </Wrapper>
        <Ratings data={data} />
      </FlexWrapper>
      <DetailedDescription data={data} />
      <SystemRequirements data={data} />
    </Container>
  );
};

export default GamePage;
