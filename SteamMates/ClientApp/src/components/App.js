import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import useWindowSize from "../hooks/useWindowSize";
import { FriendProvider } from "../contexts/FriendContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import Router from "./Router";
import LoadingIndicator from "./common/LoadingIndicator";
import Layout from "./Layout";
import NavigationBar from "./navbar/NavigationBar";

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
        <Layout>
          <Router />
        </Layout>
      </SettingsProvider>
    </FriendProvider>
  );
};

export default App;
