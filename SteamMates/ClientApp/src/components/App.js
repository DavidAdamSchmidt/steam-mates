import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import useWindowSize from "../hooks/useWindowSize";
import { FriendProvider } from "../contexts/FriendContext";
import NavigationBar from "./navbar/NavigationBar";
import MainContainer from "./MainContainer";
import LoadingIndicator from "./common/LoadingIndicator";

const App = () => {
  const { loading, clearFriends } = useContext(UserContext);
  const [width] = useWindowSize();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      window.innerWidth - document.documentElement.clientWidth + "px"
    );
  }, [width]);

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
