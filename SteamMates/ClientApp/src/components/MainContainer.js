import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchBox from "./pages/friends/SearchBox";
import GamePage from "./pages/games/GamePage";
import Home from "./pages/home/Home";
import "./../static/css/MainContainer.css";

const MainContainer = () => {
  return (
    <div className="container">
      <Switch>
        <Route path="/friends" component={SearchBox} />
        <Route path="/games" component={GamePage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default MainContainer;
