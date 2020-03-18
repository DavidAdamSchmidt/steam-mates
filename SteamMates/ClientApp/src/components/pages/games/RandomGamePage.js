import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
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

  if (data) {
    const game = data.games[Math.floor(Math.random() * data.games.length)];

    return <Redirect to={`${GAMES}/${game.game.appId}`} />;
  }

  return <div>Loading...</div>;
};

export default RandomGamePage;
