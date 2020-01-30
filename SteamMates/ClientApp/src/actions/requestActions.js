import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  RESET_STATE
} from "../constants/request";

export const requestStarted = () => ({
  type: REQUEST_STARTED
});

export const requestSuccessful = response => ({
  type: REQUEST_SUCCESSFUL,
  status: response.status,
  data: response.data
});

export const requestFailed = error => ({
  type: REQUEST_FAILED,
  status: error.response.status,
  error: error.response.data
});

export const resetState = () => ({
  type: RESET_STATE
});
