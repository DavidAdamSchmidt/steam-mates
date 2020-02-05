import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import FriendsPage from "./pages/friends/FriendsPage";
import GamesPage from "./pages/games/GamesPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";

const Container = styled.div`
  margin: 125px auto 0 auto;
  max-width: 1050px;
  padding: 15px;
`;

const MainContainer = () => {
  return (
    <Container>
      <Switch>
        <Route path="/friends" component={FriendsPage} />
        <Route path="/games" component={GamesPage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Container>
  );
};

export default MainContainer;
