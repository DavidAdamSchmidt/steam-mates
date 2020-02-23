import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import { TagProvider } from "../../../contexts/TagContext";
import TagContainer from "./TagContainer";
import GameContainer from "./GameContainer";
import { showError, getLibraryError } from "../../../utils/errorUtils";
import {
  addAverageOfRatings,
  ratingComparer
} from "../../../utils/gamesInCommonUtils";
import { API_URL } from "../../../constants/api";
import { GAMES_OF_USER, HOME } from "../../../constants/routes";

const GamesInCommonPage = () => {
  const [sendRequest, setSendRequest] = useState(false);
  const [queryString, setQueryString] = useState("");
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/common?${queryString}`,
    sendRequest,
    "GET"
  );

  const getPrivateProfiles = () => {
    if (user) {
      return [user, ...friends].filter(x => x.communityVisibilityState === 1);
    }
    if (status === 404 && error.userId) {
      return [user, ...friends].filter(x => x.steamId === error.userId);
    }
    return [];
  };

  const privateProfiles = getPrivateProfiles();

  useEffect(() => {
    if (friends && privateProfiles.length === 0) {
      setQueryString(
        `${friends
          .map((friend, index) => `${index ? "&" : ""}userId=${friend.steamId}`)
          .join("")}`
      );
      setSendRequest(true);
    }
  }, [friends, privateProfiles]);

  if (user == null) {
    return <Redirect to={HOME} />;
  }

  if (friends.length === 0 || friends.length > 3) {
    return <Redirect to={GAMES_OF_USER} />;
  }

  if (privateProfiles.length > 0) {
    return showError(getLibraryError(privateProfiles));
  }

  if ((status === 503 && error.apiName) || (status === 404 && error.tagName)) {
    return showError(error.message);
  }

  if (!loading && data) {
    addAverageOfRatings(data.games);
    data.games.sort(ratingComparer);

    return (
      <div>
        <TagProvider>
          <TagContainer />
          <GameContainer data={data} />
        </TagProvider>
      </div>
    );
  }

  return <div>{loading && <span>Loading...</span>}</div>;
};

export default GamesInCommonPage;
