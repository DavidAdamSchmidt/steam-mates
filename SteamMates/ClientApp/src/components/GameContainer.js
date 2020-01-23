import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import useRequest from "./../hooks/useRequest";
import { API_URL } from "./../constants/api";

const GameContainer = () => {
  const [sendRequest, setSendRequest] = useState(false);
  const [url, setUrl] = useState("");
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/common?${url}`,
    sendRequest,
    "GET"
  );
  console.log(data);

  if (user == null || friends.length === 0 || friends.length > 3) {
    return <Redirect to="/" />;
  } else if (!sendRequest) {
    setUrl(friends.map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`).join(""));
    setSendRequest(true);
  }

  return <div>Under construction...</div>;
};

export default GameContainer;
