import React, { useContext } from "react";
import FriendContext from "../../contexts/FriendContext";
import no_user from "../../static/images/no_user.png";
import "../../static/css/UserAvatar.css";

const UserAvatar = ({ user, isFriend }) => {
  const { removeFriend } = useContext(FriendContext);

  const handleClick = () => {
    if (isFriend) {
      removeFriend(user);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`avatar-container ${
        user && !isFriend ? "user" : "friend"
      }-avatar-container`}
    >
      <img
        className={`${user ? "user" : "no"}-avatar`}
        src={user ? user.avatarMedium : no_user}
        alt="Avatar"
      />
      {isFriend && user.avatarMedium && (
        <span className="remove-friend">X</span>
      )}
    </div>
  );
};

export default UserAvatar;
