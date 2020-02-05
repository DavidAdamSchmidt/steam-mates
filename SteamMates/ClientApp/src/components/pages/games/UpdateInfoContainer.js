import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import UpdateInfo from "./UpdateInfo";

const Notification = styled.div`
  padding-top: 20px;
  font-size: 14px;
  font-weight: 900;
`;

const UpdateInfoContainer = ({ latestUpdates }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const createUpdateInfo = (name, latestUpdate) => {
    return {
      name: name,
      latestUpdate: latestUpdate
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
    <div>
      <Notification>
        Libraries and tags are cached. See when they were updated below:
      </Notification>
      {updateInfoArray.map((x, index) => (
        <UpdateInfo key={index} updateInfo={x} />
      ))}
    </div>
  );
};

export default UpdateInfoContainer;
