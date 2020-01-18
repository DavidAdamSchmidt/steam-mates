import React from "react";
import { UserContextProvider } from "../contexts/UserContext";
import UserPanel from "./UserPanel";

const App = () => {
  return (
    <UserContextProvider>
      <UserPanel />
    </UserContextProvider>
  );
};

export default App;
