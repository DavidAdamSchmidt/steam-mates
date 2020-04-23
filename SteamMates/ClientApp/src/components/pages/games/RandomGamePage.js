import React from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import RequestHandler from "../../RequestHandler";
import { PATH, API_ROOT } from "../../../constants";

const RandomGamePage = () => {
  const request = useRequest(`${API_ROOT}/games`, true, "GET");

  const picked = (request || {}).data
    ? request.data.games[Math.floor(Math.random() * request.data.games.length)]
    : null;

  return (
    <RequestHandler request={request}>
      {picked && <Redirect to={`${PATH.GAMES}/${picked.game.appId}`} />}
    </RequestHandler>
  );
};

export default RandomGamePage;
