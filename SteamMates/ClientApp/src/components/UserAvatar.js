import React from "react";
import no_user from "./../static/images/no_user.png";
import "./../static/css/UserAvatar.css";

const UserAvatar = ({ src, user }) => {
  return (
    <div
      className={`avatar-container ${
        user ? "user" : "friend"
      }-avatar-container`}
    >
      <img
        className={`${src ? "user" : "no"}-avatar`}
        src={src ? src : no_user}
        alt="Avatar"
      />
    </div>
  );
};

export default UserAvatar;
