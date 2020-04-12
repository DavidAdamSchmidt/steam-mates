import React from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import { checkPageError } from "../../../utils/errorUtils";
import { API_URL } from "../../../constants/api";
import { GAMES } from "../../../constants/routes";

const RandomGamePage = () => {
  const [, status, data, error] = useRequest(`${API_URL}/games`, true, "GET");

  const hasError = checkPageError(status, error);
  if (hasError) {
    return hasError;
  }

  if (!data) {
    return null;
  }

  const picked = data.games[Math.floor(Math.random() * data.games.length)];

  return <Redirect to={`${GAMES}/${picked.game.appId}`} />;
};

export default RandomGamePage;
