import React from "react";
import { UserProvider } from "../contexts/UserContext";
import { FriendProvider } from "../contexts/FriendContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import Router from "./Router";
import Layout from "./Layout";
import NavigationBar from "./navbar/NavigationBar";
import Theme from "./Theme";

const App = () => {
  return (
    <UserProvider>
      <FriendProvider>
        <SettingsProvider>
          <Theme>
            <NavigationBar />
            <Layout>
              <Router />
            </Layout>
          </Theme>
        </SettingsProvider>
      </FriendProvider>
    </UserProvider>
  );
};

export default App;
