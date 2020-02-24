import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import { TagProvider } from "../../../contexts/TagContext";
import TagContainer from "./TagContainer";
import GameContainer from "./GameContainer";
import { API_URL } from "../../../constants/api";
import { HOME } from "../../../constants/routes";

const GamesOfUserPage = () => {
  const { user } = useContext(UserContext);

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games`,
    true,
    "GET"
  );

  if (user == null) {
    return <Redirect to={HOME} />;
  }

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && data && (
        <TagProvider>
          <TagContainer />
          <GameContainer data={data} />
        </TagProvider>
      )}
    </div>
  );
};

export default GamesOfUserPage;
