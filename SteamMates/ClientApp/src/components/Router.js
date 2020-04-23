import React from "react";
import { Switch, Route } from "react-router-dom";
import FriendsPage from "./pages/friends/FriendsPage";
import GamePage from "./pages/game/GamePage";
import GamesInCommonPage from "./pages/games/GamesInCommonPage";
import GamesOfUserPage from "./pages/games/GamesOfUserPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import RandomGamePage from "./pages/games/RandomGamePage";
import PrivateRoute from "./PrivateRoute";
import { PATH } from "../constants";

const Router = () => {
  return (
    <Switch>
      <PrivateRoute path={PATH.FRIENDS} component={FriendsPage} />
      <PrivateRoute path={PATH.RANDOM_GAME} component={RandomGamePage} />
      <PrivateRoute path={PATH.GAMES_IN_COMMON} component={GamesInCommonPage} />
      <PrivateRoute path={PATH.GAMES_OF_USER} component={GamesOfUserPage} />
      <PrivateRoute path={`${PATH.GAMES}/:id`} component={GamePage} />
      <Route path={PATH.ERROR} component={ErrorPage} />
      <Route path={PATH.HOME} component={HomePage} />
    </Switch>
  );
};

export default Router;
