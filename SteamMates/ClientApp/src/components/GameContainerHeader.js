import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import TagContext from "../contexts/TagContext";
import "./../static/css/GameContainerHeader.css";

const GameContainerHeader = ({ gameCount }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { tags } = useContext(TagContext);

  return (
    <div className="game-container-header">
      <div>
        <span>Users:</span> {user.personaName},{" "}
        {friends.map(friend => friend.personaName).join(", ")}
      </div>
      <div>
        <span>Tags:</span> {tags.length > 0 ? tags.join(", ") : "N/A"}
      </div>
      <div>
        <span>Games Found:</span> {gameCount}
      </div>
    </div>
  );
};

export default GameContainerHeader;
