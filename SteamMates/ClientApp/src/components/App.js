import React from "react";
import { UserProvider } from "../contexts/UserContext";
import { FriendProvider } from "../contexts/FriendContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import Router from "./Router";
import Layout from "./Layout";
import NavigationBar from "./navbar/NavigationBar";

const App = () => {
  return (
    <UserProvider>
      <FriendProvider>
        <SettingsProvider>
          <ThemeProvider>
            <NavigationBar />
            <Layout>
              <Router />
            </Layout>
          </ThemeProvider>
        </SettingsProvider>
      </FriendProvider>
    </UserProvider>
  );
};

export default App;
