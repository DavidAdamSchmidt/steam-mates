import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import TagContainer from "./TagContainer";
import GameContainer from "./GameContainer";
import useRequest from "../hooks/useRequest";
import { API_URL } from "../constants/api";

const GamePage = () => {
  const [fetchData, setFetchData] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [tags, setTags] = useState(null);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/common?${queryString}`,
    sendRequest,
    "GET"
  );

  useEffect(() => {
    if (friends && tags) {
      setQueryString(
        `${friends
          .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
          .join("")}`
      );
      setSendRequest(true);
    }
  }, [friends, fetchData]);

  if (user == null || friends.length === 0 || friends.length > 3) {
    return <Redirect to="/" />;
  }

  const handleButtonClick = selectedTags => {
    setTags(selectedTags);
    if (!fetchData) {
      setFetchData(true);
    }
  };

  return (
    <div className="game-page">
      <TagContainer loading={loading} onButtonClick={handleButtonClick} />
      {(loading || data) && (
        <GameContainer loading={loading} data={data} tags={tags} />
      )}
    </div>
  );
};

export default GamePage;
