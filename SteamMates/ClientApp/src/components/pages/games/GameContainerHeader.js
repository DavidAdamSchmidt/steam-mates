import React, { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import TagContext from "../../../contexts/TagContext";
import UpdateInfoContainer from "./UpdateInfoContainer";
import "../../../static/css/GameContainerHeader.css";

const GameContainerHeader = ({ gameCount, latestUpdates }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { initialTagsState, tags } = useContext(TagContext);
  const spanClassName = "game-result-key";

  return (
    <div className="game-container-header">
      <div>
        <span className={spanClassName}>Users:</span> {user.personaName},{" "}
        {friends.map(friend => friend.personaName).join(", ")}
      </div>
      <div>
        <span className={spanClassName}>Tags:</span>{" "}
        {tags.length > 0
          ? initialTagsState.filter(tag => tags.includes(tag)).join(", ")
          : "N/A"}
      </div>
      <div>
        <span className={spanClassName}>Games Found:</span> {gameCount}
      </div>
      <UpdateInfoContainer latestUpdates={latestUpdates} />
    </div>
  );
};

export default GameContainerHeader;
