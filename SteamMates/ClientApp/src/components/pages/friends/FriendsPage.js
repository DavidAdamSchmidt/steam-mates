import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import SearchBox from "./SearchBox";
import { getElapsedTimeText } from "../../../utils/updateInfoUtils";

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
`;

const LatestUpdate = styled.div`
  float: right;
  padding: 20px;
  font-size: 14px;
  font-style: italic;
  color: #a4a4a4;
`;

const FriendsPage = () => {
  const { user } = useContext(UserContext);

  if (user == null) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <SearchBox />
      <LatestUpdate>
        Friends were updated {getElapsedTimeText(user.latestUpdate)}
      </LatestUpdate>
    </Wrapper>
  );
};

export default FriendsPage;
