import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import FriendContext from "../../../contexts/FriendContext";
import { showError } from "../../../utils/errorUtils";

const Wrapper = styled.div`
  margin: 0 10px;
`;

const Welcome = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Instruction = styled.div`
  padding-top: 20px;
`;

const HomePage = () => {
  const { user, status, error } = useContext(UserContext);
  const { friends } = useContext(FriendContext);

  if (status === 503 && (error || {}).apiName === "Steam") {
    return showError(error.message);
  }

  return (
    <Wrapper>
      <Welcome>
        {user
          ? `Good to see you, ${user.personaName}!`
          : "Welcome to SteamMates!"}
      </Welcome>
      {!user ? (
        <Instruction>
          Please sign in through Steam to begin using our services.
        </Instruction>
      ) : friends.length > 0 ? (
        <Instruction>
          Find out which <Link to="/games">games</Link> you and your selected
          friends can play together.
        </Instruction>
      ) : (
        <Instruction>
          Select some <Link to="/friends">friends</Link> first who you want to
          play with.
        </Instruction>
      )}
    </Wrapper>
  );
};

export default HomePage;
