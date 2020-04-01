import React from "react";
import styled, { css, keyframes } from "styled-components";
import steam_logo from "./../../static/images/steam_logo.jpg";

const spin = keyframes`
   0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Spinner = styled.div`
  animation: ${spin} 670ms linear infinite;
  margin: 100px 0 20px 0;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: url(${steam_logo}) no-repeat center;
  background-size: cover;

  ${({ delay }) =>
    delay &&
    css`
      animation-delay: ${delay}ms;
    `}
`;

const Text = styled.div`
  font-size: 18px;
  font-family: boxed, helvetica neue, Helvetica, Roboto, Arial, sans-serif;
  font-weight: bold;
`;

const LoadingIndicator = ({ delay }) => {
  return (
    <Container>
      <Spinner delay={delay} />
      <Text>Loading. Please wait...</Text>
    </Container>
  );
};

export default LoadingIndicator;
