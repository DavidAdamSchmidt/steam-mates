import React from "react";
import { UserContextProvider } from "../contexts/UserContext";
import UserPanel from "./UserPanel";
import NavigationBar from "./NavigationBar";

const App = () => {
  return (
    <div className="app">
      <NavigationBar />
      <UserContextProvider>
        <UserPanel />
      </UserContextProvider>
    </div>
  );
};

export default App;
