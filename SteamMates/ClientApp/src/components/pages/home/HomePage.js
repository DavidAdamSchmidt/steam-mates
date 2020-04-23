import React, { useContext } from "react";
import styled, { css, keyframes, ThemeContext } from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";
import UserContext from "../../../contexts/UserContext";
import { showError } from "../../../utils/errorUtils";
import hero from "../../../static/images/home_page_hero.jpg";
import { ERROR } from "../../../constants";

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
  height: ${({ height }) => height};
  background: url(${hero}) no-repeat bottom;
  background-size: cover;
`;

const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 60px);
  background: #131919;
  color: white;
`;

const TextBox = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 1.22vw;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      margin-left: 0.95vw;
    }

    @media (${theme.queries.big}) {
      margin-left: 10px;
    }
  `}
`;

const TextBoxMain = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 8.9vw;
  letter-spacing: 2.46vw;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      font-size: 6.75vw;
      letter-spacing: 1.86vw;
    }

    @media (${theme.queries.big}) {
      animation: ${moveInFromLeft} 1.6s ease-out;
      font-size: 72px;
      letter-spacing: 20px;
    }
  `}
`;

const TextBoxSub = styled.span`
  display: block;
  font-size: 2.23vw;
  letter-spacing: 0.66vw;
  color: orange;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      font-size: 1.687vw;
      letter-spacing: 0.5vw;
    }

    @media (${theme.queries.big}) {
      animation: ${moveInFromRight} 1.6s ease-out;
      font-size: 18px;
      letter-spacing: 5.37px;
    }
  `}
`;

const HomePage = () => {
  const [width, height] = useWindowSize();
  const { status, error } = useContext(UserContext);
  const { containerWidth } = useContext(ThemeContext);

  if (status === 503 && (error || {}).apiName === "Steam") {
    return showError(
      `${error.message}` +
        " This could be related either to Steam or your privacy settings." +
        " Please make sure your basic details, game details and friends list are all public."
    );
  }

  if ((error || {}).message === ERROR.NETWORK_ERROR) {
    return showError("Could not connect to the server.");
  }

  return (
    <Wrapper>
      <Header
        height={
          Math.min(width, containerWidth) / height > 1.25 ? "100%" : "68vh"
        }
      >
        <TextBox>
          <TextBoxMain>steam mates</TextBoxMain>
          <TextBoxSub>find the best games to play with your friends</TextBoxSub>
        </TextBox>
      </Header>
    </Wrapper>
  );
};

export default HomePage;
