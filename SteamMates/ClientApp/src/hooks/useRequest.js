import { useReducer, useCallback, useEffect } from "react";
import Axios from "axios";
import requestReducer from "../reducers/requestReducer";
import {
  requestStarted,
  requestSuccessful,
  requestFailed,
  resetState
} from "../actions/requestActions";

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

  const [state, dispatch] = useReducer(requestReducer, initialState, undefined);

  const sendGetRequest = useCallback(() => {
    Axios.get(url, { withCredentials: withCredentials })
      .then(response => dispatch(requestSuccessful(response)))
      .catch(error => dispatch(requestFailed(error)));
  }, [url, withCredentials]);

  const sendPostRequest = useCallback(() => {
    Axios.post(url, data, { withCredentials: withCredentials })
      .then(response => dispatch(requestSuccessful(response)))
      .catch(error => dispatch(requestFailed(error)));
  }, [url, data, withCredentials]);

  const sendPutRequest = useCallback(() => {
    Axios.put(url, data, { withCredentials: withCredentials })
      .then(response => dispatch(requestSuccessful(response)))
      .catch(error => dispatch(requestFailed(error)));
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
    } else if (method === "PUT") {
      sendPutRequest();
    }
  }, [send, method, sendGetRequest, sendPostRequest, sendPutRequest]);

  const reset = () => {
    dispatch(resetState());
  };

  return [state.loading, state.status, state.data, state.error, reset];
};

export default useRequest;
