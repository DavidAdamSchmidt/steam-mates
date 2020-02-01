import React from "react";
import { Switch, Route } from "react-router-dom";
import FriendsPage from "./pages/friends/FriendsPage";
import GamesPage from "./pages/games/GamesPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import "./../static/css/MainContainer.css";

const MainContainer = () => {
  return (
    <div className="container">
      <Switch>
        <Route path="/friends" component={FriendsPage} />
        <Route path="/games" component={GamesPage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default MainContainer;
