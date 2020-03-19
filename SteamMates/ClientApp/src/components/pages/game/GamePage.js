import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import GamePageHeader from "./GamePageHeader";
import ShortDescription from "./ShortDescription";
import Media from "./Media";
import ExtraInfo from "./ExtraInfo";
import UserInfo from "./UserInfo";
import DetailedDescription from "./DetailedDescription";
import SystemRequirements from "./SystemRequirements";
import FlexWrapper from "../../common/FlexWrapper";
import { constructGamePageUrl } from "../../../utils/urlUtils";
import { constructUserInfo } from "../../../utils/userInfoUtils";
import { HOME } from "../../../constants/routes";

const Container = styled.div`
  margin-top: -70px;
`;

const Wrapper = styled.span`
  width: 640px;
`;

const GamePage = ({ match }) => {
  const [id, setId] = useState(0);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const [loading, status, data, error] = useRequest(
    constructGamePageUrl(id, friends),
    user !== null && id > 0,
    "GET"
  );

  useEffect(() => {
    setId(parseInt(match.params.id));
  }, [match.params.id]);

  if (user == null || isNaN(id)) {
    return <Redirect to={HOME} />;
  }

  if (loading || !data) {
    return <div>{loading && <span>Loading...</span>}</div>;
  }

  const info = constructUserInfo(user, friends, data.userInfo);

  return (
    <Container>
      <GamePageHeader
        id={id}
        name={data.name}
        developers={data.developers}
        publishers={data.publishers}
        owned={info[0].rating || info[0].hasGame}
      />
      <ShortDescription description={data.shortDescription} />
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
        <UserInfo id={id} info={info} />
      </FlexWrapper>
      <DetailedDescription description={data.detailedDescription} />
      <SystemRequirements
        pcRequirements={data.pcRequirements}
        macRequirements={data.macRequirements}
        linuxRequirements={data.linuxRequirements}
      />
    </Container>
  );
};

export default GamePage;
