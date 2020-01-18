import { useReducer, useCallback, useEffect } from "react";
import Axios from "axios";
import fetchReducer from "../reducers/fetchReducer";
import {
  requestStarted,
  requestSuccessful,
  requestFailed,
  resetState
} from "../actions/fetchActions";

const useRequest = (
  url,
  send,
  method = "GET",
  data = undefined,
  withCredentials = true
) => {
  const initialState = {
    loading: send,
    status: null,
    data: null,
    error: null
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState, undefined);

  const sendGetRequest = useCallback(() => {
    Axios.get(url, { withCredentials: withCredentials })
      .then(res => dispatch(requestSuccessful(res)))
      .catch(err => dispatch(requestFailed(err.message)));
  }, [url, withCredentials]);

  const sendPostRequest = useCallback(() => {
    Axios.post(url, data, { withCredentials: withCredentials })
      .then(res => dispatch(requestSuccessful(res)))
      .catch(err => dispatch(requestFailed(err.message)));
  }, [url, data, withCredentials]);

  useEffect(() => {
    if (!send) {
      return;
    }
    dispatch(requestStarted());
    if (method === "GET") {
      sendGetRequest();
    } else if (method === "POST") {
      sendPostRequest();
    }
  }, [send, method, sendGetRequest, sendPostRequest]);

  const reset = () => {
    dispatch(resetState());
  };

  return [state.loading, state.status, state.data, state.error, reset];
};

export default useRequest;
