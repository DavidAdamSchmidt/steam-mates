import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { FriendProvider } from "../contexts/FriendContext";
import NavigationBar from "./navbar/NavigationBar";
import MainContainer from "./MainContainer";

const App = () => {
  const { loading } = useContext(UserContext);

  return loading ? (
    "Loading..."
  ) : (
    <FriendProvider>
      <NavigationBar />
      <MainContainer />
    </FriendProvider>
  );
};

export default App;
