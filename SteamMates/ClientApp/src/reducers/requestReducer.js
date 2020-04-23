import { REQUEST } from "../constants";

const requestReducer = (state, action) => {
  switch (action.type) {
    case REQUEST.STARTED:
      return {
        ...state,
        loading: true
      };
    case REQUEST.SUCCESSFUL:
      return {
        ...state,
        loading: false,
        status: action.status,
        data: action.data,
        error: null
      };
    case REQUEST.FAILED:
      return {
        ...state,
        loading: false,
        status: action.status,
        error: action.error
      };
    case REQUEST.RESET_STATE:
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
