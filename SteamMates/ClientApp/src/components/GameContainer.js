import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import useRequest from "./../hooks/useRequest";
import GameLogo from "./GameLogo";
import { API_URL } from "./../constants/api";
import "./../static/css/GameContainer.css";

const GameContainer = () => {
  const [sendRequest, setSendRequest] = useState(false);
  const [tags, setTags] = useState([
    "Multiplayer",
    "Local Multiplayer",
    "Online Co-Op",
    "Local Co-Op"
  ]);
  const [url, setUrl] = useState("");
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/common?${url}`,
    sendRequest,
    "GET"
  );

  useEffect(() => {
    if (friends) {
      setUrl(
        `${friends
          .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
          .join("")}${tags.map(tag => `&tag=${tag}`).join("")}`
      );
      setSendRequest(true);
    }
  }, [friends, tags]);

  if (user == null || friends.length === 0 || friends.length > 3) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="game-container">
      {data &&
        data.map(stat => <GameLogo key={stat.game.appId} game={stat.game} />)}
      {data && data.length === 0 && <div>0 games were found</div>}
    </div>
  );
};

export default GameContainer;
