import React from "react";
import LoadingIndicator from "./common/LoadingIndicator";
import { checkPageError } from "../utils/errorUtils";

const RequestHandler = ({
  request: { loading, status, data, error },
  children
}) => {
  if (loading) {
    return <LoadingIndicator marginTop={"100px"} />;
  }

  const hasError = checkPageError(status, error);
  if (hasError) {
    return hasError;
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
};

export default RequestHandler;
