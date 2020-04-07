import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import LoadingIndicator from "../../common/LoadingIndicator";
import GamePageHeader from "./GamePageHeader";
import GamePageBody from "./GamePageBody";
import { constructGamePageUrl } from "../../../utils/urlUtils";
import { checkPageError } from "../../../utils/errorUtils";
import { constructUserInfo } from "../../../utils/userInfoUtils";
import { HOME } from "../../../constants/routes";

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

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return null;
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
      <GamePageBody id={id} data={data} info={info} />
    </div>
  );
};

export default GamePage;
