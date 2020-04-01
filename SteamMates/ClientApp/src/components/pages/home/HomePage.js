import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import UserContext from "../../../contexts/UserContext";
import { showError } from "../../../utils/errorUtils";
import hero from "../../../static/images/home_page_hero.jpg";
import { MEDIUM, BIG } from "../../../constants/style";
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
  background: url(${hero}) no-repeat bottom;
  background-size: cover;
`;

const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 60px);
  max-width: 100%;
  background: #131919;
  color: white;
`;

const TextBox = styled.div`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 1.22vw;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;

  @media (${MEDIUM}) {
    margin-left: 0.95vw;
  }

  @media (${BIG}) {
    margin-left: 10px;
  }
`;

const TextBoxMain = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 8.9vw;
  letter-spacing: 2.44vw;

  @media (${MEDIUM}) {
    font-size: 6.85vw;
    letter-spacing: 1.88vw;
  }

  @media (${BIG}) {
    animation: ${moveInFromLeft} 1.6s ease-out;
    font-size: 72px;
    letter-spacing: 20px;
  }
`;

const TextBoxSub = styled.span`
  display: block;
  font-size: 2.23vw;
  letter-spacing: 0.65vw;
  color: orange;

  @media (${MEDIUM}) {
    font-size: 1.72vw;
    letter-spacing: 0.5vw;
  }

  @media (${BIG}) {
    animation: ${moveInFromRight} 1.6s ease-out;
    font-size: 18px;
    letter-spacing: 5.37px;
  }
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
