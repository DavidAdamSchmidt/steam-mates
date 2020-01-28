import React, {useState, useContext, useEffect} from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import TagContainer from "./TagContainer";
import GameContainer from "./GameContainer";
import useRequest from "../hooks/useRequest";
import {API_URL} from "../constants/api";

const GamePage = () => {
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
          .join("")}${tags.map(tag => `&tag=${tag}`).join("")}`
      );
      setSendRequest(true);
    }
  }, [friends, tags]);

  if (user == null || friends.length === 0 || friends.length > 3) {
    return <Redirect to="/" />;
  }

  return (
    <div className="game-page">
      <TagContainer loading={loading} onReady={selectedTags => setTags(selectedTags)} />
      {tags && <GameContainer loading={loading} data={data} />}
    </div>
  );
};

export default GamePage;
