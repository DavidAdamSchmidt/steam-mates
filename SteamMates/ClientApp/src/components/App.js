import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { FriendProvider } from "../contexts/FriendContext";
import NavigationBar from "./navbar/NavigationBar";
import MainContainer from "./MainContainer";
import LoadingIndicator from "./common/LoadingIndicator";

const App = () => {
  const { loading, clearFriends } = useContext(UserContext);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <FriendProvider clearFriends={clearFriends}>
      <NavigationBar />
      <MainContainer />
    </FriendProvider>
  );
};

export default App;
