import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory, Redirect } from "react-router-dom";
import FriendContext from "../../../contexts/FriendContext";
import { HOME } from "../../../constants/routes";

const Message = styled.span`
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
      <div>
        <Message>Error: {message}</Message>
      </div>
    );
  }

  return <Redirect to={HOME} />;
};

export default ErrorPage;
