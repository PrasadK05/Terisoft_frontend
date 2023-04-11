import {
  PROFILE_ERROR,
  PROFILE_LOADING,
  PROFILE_SUCCESS,
} from "./profile.type";

const authInitalState = {
  loading: false,
  user: {},
  error: false,
};

// profile reducer
export const profileReducer = (state = authInitalState, action) => {
  switch (action.type) {
    case PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        error: false,
        loading: false,
      };
    }
    case PROFILE_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case PROFILE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default: {
      return state;
    }
  }
};
