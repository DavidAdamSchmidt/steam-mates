import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import UpdateInfo from "./UpdateInfo";
import "./../static/css/UpdateInfoContainer.css";

const UpdateInfoContainer = ({ latestUpdates }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const createUpdateInfo = (name, latestUpdate) => {
    return {
      name: name,
      latestUpdate: new Date(latestUpdate)
    };
  };

  const updateInfoArray = [
    createUpdateInfo(
      `${user.personaName}'s library`,
      latestUpdates[user.steamId]
    ),
    ...friends.map(x =>
      createUpdateInfo(`${x.personaName}'s library`, latestUpdates[x.steamId])
    ),
    createUpdateInfo("Tags", latestUpdates["tags"])
  ];

  return (
    <div className="update-info-container">
      <div className="update-info-notification">
        Libraries and tags are cached. See when they were updated below:
      </div>
      {updateInfoArray.map((x, index) => (
        <UpdateInfo key={index} updateInfo={x} />
      ))}
    </div>
  );
};

export default UpdateInfoContainer;
