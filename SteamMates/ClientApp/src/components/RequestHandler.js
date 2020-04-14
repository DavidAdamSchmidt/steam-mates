import React, { useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import LoadingIndicator from "./common/LoadingIndicator";
import { checkPageError } from "../utils/errorUtils";

const RequestHandler = ({
  request: { loading, status, data, error },
  ignoreEmptyData,
  children
}) => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const requestStarted = useRef(false);

  if (loading) {
    requestStarted.current = true;

    return <LoadingIndicator marginTop={"100px"} />;
  }

  const hasError = checkPageError(status, error, user, friends);
  if (hasError) {
    return hasError;
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
};

export default RequestHandler;
