import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import FriendsPage from "./pages/friends/FriendsPage";
import GamesOfUserPage from "./pages/games/GamesOfUserPage";
import GamesInCommonPage from "./pages/games/GamesInCommonPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import {
  FRIENDS,
  GAMES_IN_COMMON,
  ERROR,
  HOME,
  GAMES_OF_USER
} from "./../constants/routes";

const Container = styled.div`
  margin: 125px auto 0 auto;
  max-width: 1050px;
  padding: 15px;
`;

const MainContainer = () => {
  return (
    <Container>
      <Switch>
        <Route path={FRIENDS} component={FriendsPage} />
        <Route path={GAMES_IN_COMMON} component={GamesInCommonPage} />
        <Route path={GAMES_OF_USER} component={GamesOfUserPage} />
        <Route path={ERROR} component={ErrorPage} />
        <Route path={HOME} component={HomePage} />
      </Switch>
    </Container>
  );
};

export default MainContainer;
