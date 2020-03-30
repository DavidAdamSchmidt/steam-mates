import React from "react";
import styled from "styled-components";
import login_button from "../../static/images/login_button.png";
import { API_URL } from "../../constants/api";

const Wrapper = styled.div`
  padding: 0 20px;
`;

const Form = styled.form`
  height: 23px;
  width: 154px;
`;

const Button = styled.button`
  margin: 0;
  border: none;
  height: 23px;
  padding: 0;
  background: rgb(7, 2, 6);

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }

  & img {
    vertical-align: bottom;
  }
`;

const LoginButton = () => {
  return (
    <Wrapper>
      <Form action={`${API_URL}/user/auth`} method="post">
        <Button>
          <img src={login_button} alt="LoginButton" />
        </Button>
      </Form>
    </Wrapper>
  );
};

export default LoginButton;
