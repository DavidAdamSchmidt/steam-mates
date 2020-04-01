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
import { checkPageError } from "../../../utils/errorUtils";
import { constructUserInfo } from "../../../utils/userInfoUtils";
import { HOME } from "../../../constants/routes";

const Wrapper = styled.span`
  width: 640px;
`;

const GamePage = ({ match }) => {
  const [id, setId] = useState(null);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const [loading, status, data, error] = useRequest(
    constructGamePageUrl(id, friends),
    user != null && id != null,
    "GET"
  );

  useEffect(() => {
    const convertedId = parseInt(match.params.id);
    const int32MaxValue = 2147483647;

    if (isNaN(convertedId) || convertedId > int32MaxValue) {
      setIsInvalidId(true);
    } else {
      setId(convertedId);
    }
  }, [match.params.id]);

  const hasError = checkPageError(status, error);
  if (hasError) {
    return hasError;
  }

  if (user == null || isInvalidId) {
    return <Redirect to={HOME} />;
  }

  if (loading || !data) {
    return <div>{loading && <span>Loading...</span>}</div>;
  }

  const info = constructUserInfo(user, friends, data.userInfo);

  return (
    <div>
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
    </div>
  );
};

export default GamePage;
