import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory, Redirect } from "react-router-dom";
import FriendContext from "../../../contexts/FriendContext";
import { HOME } from "../../../constants/routes";

const Wrapper = styled.div`
  margin-top: 100px;
`;

const Message = styled.div`
  display: inline-block;
  margin: 0 20px;
  border-radius: 10px;
  padding: 10px;
  background: rgba(255, 0, 0, 0.71);
  font-weight: bold;
  color: white;
`;

const ErrorPage = props => {
  const isFirstRun = useRef(true);
  const { friends } = useContext(FriendContext);
  const history = useHistory();

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      history.goBack();
    }
  }, [friends, history]);

  const message = (((props || {}).location || {}).state || {}).message;

  if (message) {
    return (
      <Wrapper>
        <Message>Error: {message}</Message>
      </Wrapper>
    );
  }

  return <Redirect to={HOME} />;
};

export default ErrorPage;
