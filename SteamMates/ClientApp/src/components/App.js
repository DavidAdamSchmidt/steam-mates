import React, { useContext } from "react";
import UserContext, { UserContextProvider } from "../contexts/UserContext";
import NavigationBar from "./NavigationBar";
import MainContainer from "./MainContainer";

const App = () => {
  const { loading } = useContext(UserContext);

  return loading ? (
    "Loading..."
  ) : (
    <div className="app">
      <NavigationBar />
      <MainContainer />
    </div>
  );
};

export default App;
