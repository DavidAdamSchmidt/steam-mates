import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  RESET_STATE
} from "../constants/request";

export const requestStarted = () => ({
  type: REQUEST_STARTED
});

export const requestSuccessful = req => ({
  type: REQUEST_SUCCESSFUL,
  status: req.status,
  data: req.data
});

export const requestFailed = ({ error }) => ({
  type: REQUEST_FAILED,
  error
});

export const resetState = () => ({
  type: RESET_STATE
});
