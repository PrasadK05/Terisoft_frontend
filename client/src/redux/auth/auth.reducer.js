import {
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_LOADING,
  AUTH_LOG_IN_SUCCESS,
} from "./auth.type";

export const authInitalState = {
  loading: false,
  data: {
    token: "",
    isAuthenticated: false,
  },
  error: false,
};

export const authReducer = (state = authInitalState, action) => {
  switch (action.type) {
    case AUTH_LOG_IN_SUCCESS: {
      return {
        ...state,
        data: {
          token: action.payload.token,
          isAuthenticated: true,
        },
        loading: false,
        error: false,
      };
    }
    case AUTH_LOG_IN_ERROR: {
      return {
        ...state,
        error: true,
        data: {
          token: "",
          isAuthenticated: false,
        },
        loading: false,
      };
    }
    case AUTH_LOG_IN_LOADING: {
      return {
        ...state,
        loading: true,
        data: {
          token: "",
          isAuthenticated: false,
        },
        error: false,
      };
    }
    default: {
      return state;
    }
  }
};
