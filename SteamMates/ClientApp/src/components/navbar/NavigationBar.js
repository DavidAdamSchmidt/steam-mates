import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import FriendContext from "../../contexts/FriendContext";
import Logo from "./Logo";
import SimpleMenu from "./SimpleMenu";
import DropdownMenu from "./DropdownMenu";
import UserPanel from "./UserPanel";
import LoginPanel from "./LoginPanel";
import { NETWORK_ERROR } from "../../constants/request";
import {
  HOME,
  FRIENDS,
  GAMES_OF_USER,
  GAMES_IN_COMMON,
  RANDOM_GAME
} from "../../constants/routes";

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(12deg, rgb(7, 2, 6), rgb(21, 1, 66) 91.71%);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 192px repeat(3, 1fr) 1.3fr;
  margin: auto;
  max-width: 1050px;
  height: 100%;
  padding: 0 15px;
`;

const NavigationBar = () => {
  const { user, error } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const history = useHistory();
  const dropdown = [
    {
      name: "My Games",
      path: GAMES_OF_USER,
      disabled: history.location.pathname === GAMES_OF_USER
    },
    {
      name: "Common",
      path: GAMES_IN_COMMON,
      disabled:
        friends.length === 0 || history.location.pathname === GAMES_IN_COMMON
    },
    { name: "Random", path: RANDOM_GAME, disabled: false }
  ];

  return (
    <Wrapper>
      <Container>
        <Logo />
        {user ? (
          <>
            <SimpleMenu name="Home" path={HOME} />
            <SimpleMenu name="Friends" path={FRIENDS} />
            <DropdownMenu name="Games" entries={dropdown} />
            <UserPanel />
          </>
        ) : (
          (error || {}).message !== NETWORK_ERROR && <LoginPanel />
        )}
      </Container>
    </Wrapper>
  );
};

export default NavigationBar;
