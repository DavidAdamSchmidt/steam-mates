import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import UpdateInfo from "./UpdateInfo";
import { GAMES_IN_COMMON } from "../../../constants/routes";

const Notification = styled.div`
  padding-top: 20px;
  font-size: 14px;
  font-weight: 900;
`;

const UpdateInfoContainer = ({ latestUpdates }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const history = useHistory();

  const createUpdateInfo = (name, latestUpdate) => {
    return {
      name: name,
      latestUpdate: latestUpdate
    };
  };

  const updateInfo = [
    createUpdateInfo(
      `${user.personaName}'s library`,
      latestUpdates[user.steamId]
    )
  ];

  if (history.location.pathname === GAMES_IN_COMMON) {
    updateInfo.push(
      ...friends.map(x =>
        createUpdateInfo(`${x.personaName}'s library`, latestUpdates[x.steamId])
      )
    );
  }

  updateInfo.push(createUpdateInfo("Tags", latestUpdates["tags"]));

  return (
    <div>
      <Notification>
        Libraries and tags are cached. See when they were updated below:
      </Notification>
      {updateInfo.map((x, index) => (
        <UpdateInfo key={index} updateInfo={x} />
      ))}
    </div>
  );
};

export default UpdateInfoContainer;
