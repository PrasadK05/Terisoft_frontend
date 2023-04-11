import {
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_LOADING,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT_SUCCESS,
} from "./auth.type";

const authInitalState = {
  loading: false,
  data: {
    token: "",
    name: "",
    isAuthenticated: false,
  },
  error: false,
};

// Auth Reducer
export const authReducer = (state = authInitalState, action) => {
  switch (action.type) {
    case AUTH_LOG_IN_SUCCESS: {
      return {
        ...state,
        data: {
          token: action.payload.token,
          name: action.payload.name,
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
          name: "",
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
          name: "",
          isAuthenticated: false,
        },
        error: false,
      };
    }
    case AUTH_LOG_OUT_SUCCESS: {
      return {
        loading: false,
        error: false,
        data: {
          token: "",
          name: "",
          isAuthenticated: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
