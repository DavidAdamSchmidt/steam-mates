import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import FriendsPage from "./pages/friends/FriendsPage";
import GamePage from "./pages/game/GamePage";
import GamesInCommonPage from "./pages/games/GamesInCommonPage";
import GamesOfUserPage from "./pages/games/GamesOfUserPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import {
  FRIENDS,
  RANDOM_GAME,
  GAMES_IN_COMMON,
  GAMES_OF_USER,
  GAMES,
  ERROR,
  HOME
} from "./../constants/routes";
import RandomGamePage from "./pages/games/RandomGamePage";

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
        <Route path={RANDOM_GAME} component={RandomGamePage} />
        <Route path={GAMES_IN_COMMON} component={GamesInCommonPage} />
        <Route path={GAMES_OF_USER} component={GamesOfUserPage} />
        <Route path={`${GAMES}/:id`} component={GamePage} />
        <Route path={ERROR} component={ErrorPage} />
        <Route path={HOME} component={HomePage} />
      </Switch>
    </Container>
  );
};

export default MainContainer;
