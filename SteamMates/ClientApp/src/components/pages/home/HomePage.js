import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import { showError } from "../../../utils/errorUtils";
import hero from "../../../static/images/home_page_hero.jpg";
import { NETWORK_ERROR } from "../../../constants/request";

const Wrapper = styled.div`
  margin-top: -55px;
  height: calc(100vh - 70px);
  max-width: 100%;
  background: #131919;
  color: white;
`;

const Header = styled.div`
  width: 100%;
  max-width: 1050px;
  height: 100%;
  max-height: 61vh;
  background: url(${hero}) no-repeat center;
  background-size: cover;
`;

const HomePage = () => {
  const { status, error } = useContext(UserContext);

  if (status === 503 && (error || {}).apiName === "Steam") {
    return showError(error.message);
  }

  if ((error || {}).message === NETWORK_ERROR) {
    return showError("Could not connect to the server.");
  }

  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

export default HomePage;
