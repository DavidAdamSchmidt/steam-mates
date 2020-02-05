import React from "react";
import styled from "styled-components";
import login_button from "../../static/images/login_button.png";

const Form = styled.form`
  height: 23px;
  width: 154px;
`;

const Button = styled.button`
  margin: 0;
  border: none;
  height: 23px;
  padding: 0;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`;

const LoginButton = ({ path }) => {
  return (
    <Form action={path} method="post">
      <Button>
        <img src={login_button} alt="LoginButton" />
      </Button>
    </Form>
  );
};

export default LoginButton;
