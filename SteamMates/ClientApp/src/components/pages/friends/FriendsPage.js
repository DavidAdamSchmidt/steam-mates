import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import SearchBox from "./SearchBox";
import { getElapsedTimeText } from "../../../utils/updateInfoUtils";
import "./../../../static/css/FriendsPage.css";

const FriendsPage = () => {
  const { user } = useContext(UserContext);

  if (user == null) {
    return <Redirect to="/" />;
  }

  return (
    <div className="friends-page">
      <SearchBox />
      <div className="friends-latest-update">
        Friends were updated {getElapsedTimeText(new Date(user.latestUpdate))}
      </div>
    </div>
  );
};

export default FriendsPage;
