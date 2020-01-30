import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import { TagProvider } from "../contexts/TagContext";
import TagContainer from "./TagContainer";
import GameContainer from "./GameContainer";
import LibraryError from "./LibraryError";
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

  let privateProfile;
  if (status === 404 && error.userId) {
    privateProfile = [user, ...friends].find(x => x.steamId === error.userId);
  } else {
    privateProfile = [user, ...friends].find(
      x => x.communityVisibilityState === 1
    );
  }

  useEffect(() => {
    if (friends && !privateProfile) {
      setQueryString(
        `${friends
          .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
          .join("")}`
      );
      setSendRequest(true);
    }
  }, [friends, privateProfile]);

  if (user == null || friends.length === 0 || friends.length > 3) {
    return <Redirect to="/" />;
  }

  if (privateProfile) {
    return <LibraryError userName={privateProfile.personaName} />;
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
