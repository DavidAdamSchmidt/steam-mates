import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import useWindowSize from "../hooks/useWindowSize";
import { FriendProvider } from "../contexts/FriendContext";
import { SettingsProvider } from "../contexts/SettingsContext";
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
    return <LoadingIndicator marginTop={"100px"} />;
  }

  return (
    <FriendProvider clearFriends={clearFriends}>
      <SettingsProvider>
        <NavigationBar />
        <MainContainer />
      </SettingsProvider>
    </FriendProvider>
  );
};

export default App;
