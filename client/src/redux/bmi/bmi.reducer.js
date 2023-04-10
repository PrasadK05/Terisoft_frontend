import {
  BMI_ERROR,
  BMI_HISTORY_SUCCESS,
  BMI_LOADING,
  BMI_VALUE_SUCCESS,
} from "./bmi.type";

export const bmiInitalState = {
  loading: false,
  bmi_history: [],
  error: false,
  bmi_value: "",
};

export const bmiReducer = (state = bmiInitalState, action) => {
  switch (action.type) {
    case BMI_VALUE_SUCCESS: {
      return {
        ...state,
        bmi_value: action.payload.result,
        loading: false,
        error: false,
      };
    }
    case BMI_HISTORY_SUCCESS: {
      return {
        ...state,
        bmi_history: action.payload.result,
        loading: false,
        error: false,
      };
    }
    case BMI_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case BMI_LOADING: {
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
