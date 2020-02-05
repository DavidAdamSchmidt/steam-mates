import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import { API_URL } from "../../constants/api";

const Wrapper = styled.div`
  grid-column: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoginPanel = () => {
  return (
    <Wrapper>
      <LoginButton path={`${API_URL}/user/auth`} />
    </Wrapper>
  );
};

export default LoginPanel;
