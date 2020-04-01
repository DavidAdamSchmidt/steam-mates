import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import LoadingIndicator from "../../common/LoadingIndicator";
import { checkPageError } from "../../../utils/errorUtils";
import { API_URL } from "../../../constants/api";
import { HOME, GAMES } from "../../../constants/routes";

const RandomGamePage = () => {
  const { user } = useContext(UserContext);

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games`,
    user,
    "GET"
  );

  if (user == null) {
    return <Redirect to={HOME} />;
  }

  const hasError = checkPageError(status, error);
  if (hasError) {
    return hasError;
  }

  if (loading) {
    return <LoadingIndicator delay={150} />;
  }

  if (!data) {
    return null;
  }

  const picked = data.games[Math.floor(Math.random() * data.games.length)];

  return <Redirect to={`${GAMES}/${picked.game.appId}`} />;
};

export default RandomGamePage;
