import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import TagContext from "../contexts/TagContext";
import "./../static/css/GameContainerHeader.css";
import UpdateInfoContainer from "./UpdateInfoContainer";

const GameContainerHeader = ({ gameCount, latestUpdates }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { tags } = useContext(TagContext);
  const spanClassName = "game-container-header-key";

  return (
    <div className="game-container-header">
      <div>
        <span className={spanClassName}>Users:</span> {user.personaName},{" "}
        {friends.map(friend => friend.personaName).join(", ")}
      </div>
      <div>
        <span className={spanClassName}>Tags:</span>{" "}
        {tags.length > 0 ? tags.join(", ") : "N/A"}
      </div>
      <div>
        <span className={spanClassName}>Games Found:</span> {gameCount}
      </div>
      <UpdateInfoContainer latestUpdates={latestUpdates} />
    </div>
  );
};

export default GameContainerHeader;
