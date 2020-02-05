import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { UserProvider } from "./contexts/UserContext";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Lato", sans-serif;
    overflow-y: scroll;
    margin: 0;
    background-color: #f3f3f3;
  }
  
  a:link,
  a:hover,
  a:focus,
  a:active,
  a:visited {
    color: purple;
  }
`;

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <GlobalStyle />
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
