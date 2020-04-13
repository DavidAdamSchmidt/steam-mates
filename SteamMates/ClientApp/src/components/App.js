import React, { useEffect } from "react";
import { UserProvider } from "../contexts/UserContext";
import useWindowSize from "../hooks/useWindowSize";
import { FriendProvider } from "../contexts/FriendContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import Router from "./Router";
import Layout from "./Layout";
import NavigationBar from "./navbar/NavigationBar";

const App = () => {
  const [width] = useWindowSize();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      window.innerWidth - document.documentElement.clientWidth + "px"
    );
  }, [width]);

  return (
    <UserProvider>
      <FriendProvider>
        <SettingsProvider>
          <NavigationBar />
          <Layout>
            <Router />
          </Layout>
        </SettingsProvider>
      </FriendProvider>
    </UserProvider>
  );
};

export default App;
