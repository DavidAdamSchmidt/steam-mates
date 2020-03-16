import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import {API_URL} from "../../../constants/api";

const GamePage = () => {
  const [gameId, setGameId] = useState(0);
  const history = useHistory();

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/${gameId}`,
    gameId > 0,
    "GET"
  );

  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const id = parseInt(query.get("id"));

    if (isNaN(id)) {
      history.goBack();
    }

    setGameId(id);
  }, [history]);

  return <div>{data && data.name}</div>;
};

export default GamePage;
