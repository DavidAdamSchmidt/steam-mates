import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  RESET_STATE
} from "../constants";

const requestReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        loading: true
      };
    case REQUEST_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        status: action.status,
        data: action.data,
        error: null
      };
    case REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case RESET_STATE:
      return {
        loading: false,
        status: null,
        data: null,
        error: null
      };
    default:
      return state;
  }
};

export default requestReducer;
