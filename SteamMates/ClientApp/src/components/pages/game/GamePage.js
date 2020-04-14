import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import RequestHandler from "../../RequestHandler";
import GamePageHeader from "./GamePageHeader";
import GamePageBody from "./GamePageBody";
import {
  constructGamePageUrl,
  constructUserInfo
} from "../../../utils/gameUtils";
import { HOME } from "../../../constants/routes";

const GamePage = ({ match }) => {
  const [id, setId] = useState(null);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const request = useRequest(
    constructGamePageUrl(id, friends),
    user != null && id != null,
    "GET"
  );
  const { data } = request;

  useEffect(() => {
    const convertedId = parseInt(match.params.id);
    const int32MaxValue = 2147483647;

    if (isNaN(convertedId) || convertedId > int32MaxValue) {
      setIsInvalidId(true);
    } else {
      setId(convertedId);
    }
  }, [match.params.id]);

  if (isInvalidId) {
    return <Redirect to={HOME} />;
  }

  const info = data ? constructUserInfo(user, friends, data.userInfo) : null;

  return (
    <RequestHandler request={request}>
      {data && (
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
      )}
    </RequestHandler>
  );
};

export default GamePage;
