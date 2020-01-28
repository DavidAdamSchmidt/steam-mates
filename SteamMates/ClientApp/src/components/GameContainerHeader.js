import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import "./../static/css/GameContainerHeader.css";

const GameContainerHeader = ({ tags, gameCount }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  return (
    <div className="game-container-header">
      <div>
        <span>Users:</span> {user.personaName},{" "}
        {friends.map(friend => friend.personaName).join(", ")}
      </div>
      <div>
        <span>Tags:</span> {tags.join(", ")}
      </div>
      <div>
        <span>Games Found:</span> {gameCount}
      </div>
    </div>
  );
};

export default GameContainerHeader;
