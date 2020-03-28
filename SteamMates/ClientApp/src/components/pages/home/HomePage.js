import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import UserContext from "../../../contexts/UserContext";
import { showError } from "../../../utils/errorUtils";
import hero from "../../../static/images/home_page_hero.jpg";
import { NETWORK_ERROR } from "../../../constants/request";

const moveInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30%);
  }
  
  84% {
    transform: translateX(0.9%);
  }
  
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const moveInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30%);
  }
  
  84% {
    transform: translateX(-0.9%);
  }
  
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  max-width: 1050px;
  height: 100%;
  max-height: 61vh;
  background: url(${hero}) no-repeat center;
  background-size: cover;
`;

const Wrapper = styled.div`
  margin-top: -55px;
  height: calc(100vh - 70px);
  max-width: 100%;
  background: #131919;
  color: white;
`;

const TextBox = styled.div`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 10px;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
`;

const TextBoxMain = styled.span`
  display: block;
  animation: ${moveInFromLeft} 1.6s ease-out;
  margin-bottom: 10px;
  font-size: 72px;
  letter-spacing: 20px;
`;

const TextBoxSub = styled.span`
  display: block;
  animation: ${moveInFromRight} 1.6s ease-out;
  font-size: 18px;
  letter-spacing: 5.3px;
  color: orange;
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
      <Header>
        <TextBox>
          <TextBoxMain>steam mates</TextBoxMain>
          <TextBoxSub>find the best games to play with your friends</TextBoxSub>
        </TextBox>
      </Header>
    </Wrapper>
  );
};

export default HomePage;
