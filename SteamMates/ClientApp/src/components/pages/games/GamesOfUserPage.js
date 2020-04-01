import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import { TagProvider } from "../../../contexts/TagContext";
import LoadingIndicator from "../../common/LoadingIndicator";
import TagContainer from "./TagContainer";
import GameContainer from "./GameContainer";
import { checkPageError } from "../../../utils/errorUtils";
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

  const hasError = checkPageError(status, error);
  if (hasError) {
    return hasError;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return null;
  }

  return (
    <TagProvider>
      <TagContainer />
      <GameContainer data={data} />
    </TagProvider>
  );
};

export default GamesOfUserPage;
