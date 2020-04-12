import React from "react";
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
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <Switch>
      <PrivateRoute path={FRIENDS} component={FriendsPage} />
      <PrivateRoute path={RANDOM_GAME} component={RandomGamePage} />
      <PrivateRoute path={GAMES_IN_COMMON} component={GamesInCommonPage} />
      <PrivateRoute path={GAMES_OF_USER} component={GamesOfUserPage} />
      <PrivateRoute path={`${GAMES}/:id`} component={GamePage} />
      <Route path={ERROR} component={ErrorPage} />
      <Route path={HOME} component={HomePage} />
    </Switch>
  );
};

export default Router;
