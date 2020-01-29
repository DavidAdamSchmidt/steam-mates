import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import { TagProvider } from "../contexts/TagContext";
import TagContainer from "./TagContainer";
import GameContainer from "./GameContainer";
import useRequest from "../hooks/useRequest";
import { API_URL } from "../constants/api";

const GamePage = () => {
  const [sendRequest, setSendRequest] = useState(false);
  const [queryString, setQueryString] = useState("");
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/common?${queryString}`,
    sendRequest,
    "GET"
  );

  useEffect(() => {
    if (friends) {
      setQueryString(
        `${friends
          .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
          .join("")}`
      );
      setSendRequest(true);
    }
  }, [friends]);

  if (user == null || friends.length === 0 || friends.length > 3) {
    return <Redirect to="/" />;
  }

  return (
    <div className="game-page">
      {loading && <span>Loading...</span>}
      {!loading && data && (
        <TagProvider>
          <TagContainer />
          <GameContainer data={data} />
        </TagProvider>
      )}
    </div>
  );
};

export default GamePage;
