import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import { showError } from "../../../utils/errorUtils";
import "./../../../static/css/HomePage.css";

const HomePage = () => {
  const { user, status, error } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const instruction = "instruction";

  if (status === 503 && (error || {}).apiName === "Steam") {
    return showError(error.message);
  }

  return (
    <div className="home-page">
      <div className="welcome-message">
        {user
          ? `Good to see you, ${user.personaName}!`
          : "Welcome to SteamMates!"}
      </div>
      {!user ? (
        <div className={instruction}>
          Please sign in through Steam to begin using our services.
        </div>
      ) : friends.length > 0 ? (
        <div className={instruction}>
          Find out which <Link to="/games">games</Link> you and your selected
          friends can play together.
        </div>
      ) : (
        <div className={instruction}>
          Select some <Link to="/friends">friends</Link> first who you want to
          play with.
        </div>
      )}
    </div>
  );
};

export default HomePage;
