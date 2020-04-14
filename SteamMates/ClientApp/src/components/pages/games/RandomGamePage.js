import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import { checkPageError } from "../../../utils/errorUtils";
import { API_URL } from "../../../constants/api";
import { GAMES } from "../../../constants/routes";

const RandomGamePage = () => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { status, data, error } = useRequest(`${API_URL}/games`, true, "GET");

  const hasError = checkPageError(status, error, user, friends);
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
