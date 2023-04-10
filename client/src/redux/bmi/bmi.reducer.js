import {
  PRODUCT_ERROR,
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
} from "./bmi.type";

export const bmiInitalState = {
  loading: false,
  bmi_history: [],
  error: false,
  bmi_value:""
};

export const bmiReducer = (state = bmiInitalState, action) => {
  switch (action.type) {
    case PRODUCT_SUCCESS: {
      return {
        ...state,
        prod: action.payload,
      };
    }
    case PRODUCT_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case PRODUCT_LOADING: {
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
