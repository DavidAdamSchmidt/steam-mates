import React, { useRef } from "react";
import LoadingIndicator from "./common/LoadingIndicator";
import { checkPageError } from "../utils/errorUtils";

const RequestHandler = ({
  request: { loading, status, data, error },
  ignoreEmptyData,
  children
}) => {
  const requestStarted = useRef(false);

  if (loading) {
    requestStarted.current = true;

    return <LoadingIndicator marginTop={"100px"} />;
  }

  const hasError = checkPageError(status, error);
  if (hasError) {
    return hasError;
  }

  if (!data && !(ignoreEmptyData && requestStarted.current)) {
    return null;
  }

  return <>{children}</>;
};

export default RequestHandler;
