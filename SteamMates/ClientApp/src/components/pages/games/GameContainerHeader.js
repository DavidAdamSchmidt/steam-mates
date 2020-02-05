import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import TagContext from "../../../contexts/TagContext";
import UpdateInfoContainer from "./UpdateInfoContainer";

const Wrapper = styled.div`
  margin-bottom: 40px;
  border-radius: 20px;
  padding: 20px;
  background: rgba(17, 200, 163, 0.18);
  font-size: 17px;
  line-height: 2;
  color: #1c3109;
`;

const ResultName = styled.span`
  font-weight: bold;
`;

const GameContainerHeader = ({ gameCount, latestUpdates }) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { initialTagsState, tags } = useContext(TagContext);

  return (
    <Wrapper>
      <div>
        <ResultName>Users:</ResultName> {user.personaName},{" "}
        {friends.map(friend => friend.personaName).join(", ")}
      </div>
      <div>
        <ResultName>Tags:</ResultName>{" "}
        {tags.length > 0
          ? initialTagsState.filter(tag => tags.includes(tag)).join(", ")
          : "N/A"}
      </div>
      <div>
        <ResultName>Games Found:</ResultName> {gameCount}
      </div>
      <UpdateInfoContainer latestUpdates={latestUpdates} />
    </Wrapper>
  );
};

export default GameContainerHeader;
