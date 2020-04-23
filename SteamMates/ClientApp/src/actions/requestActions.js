import { REQUEST, ERROR } from "../constants";

export const requestStarted = () => ({
  type: REQUEST.STARTED
});

export const requestSuccessful = response => ({
  type: REQUEST.SUCCESSFUL,
  status: response.status,
  data: response.data
});

export const requestFailed = error => ({
  type: REQUEST.FAILED,
  status: (error.response || {}).status,
  error:
    error.message === ERROR.NETWORK_ERROR ? error : (error.response || {}).data
});

export const resetState = () => ({
  type: REQUEST.RESET_STATE
});
