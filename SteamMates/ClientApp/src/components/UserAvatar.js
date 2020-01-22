import React from "react";
import no_user from "./../static/images/no_user.png";
import "./../static/css/UserAvatar.css";

const UserAvatar = ({ src }) => {
  return (
    <div className="user-avatar-container">
      <img
        className={`${src ? "" : "no-"}user-avatar`}
        src={src ? src : no_user}
        alt="Avatar"
      />
    </div>
  );
};

export default UserAvatar;
