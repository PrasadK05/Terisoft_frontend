import {
  BMI_ERROR,
  BMI_HISTORY_SUCCESS,
  BMI_LOADING,
  BMI_VALUE_SUCCESS,
} from "./bmi.type";
import axios from "axios";

// action for bmi value
export const bmivalSucc = (payload) => {
  return {
    type: BMI_VALUE_SUCCESS,
    payload,
  };
};

// action for bmi history
export const bmihistSucc = (payload) => {
  return {
    type: BMI_HISTORY_SUCCESS,
    payload,
  };
};

// action for bmi value or bmi history failure
export const bmiFail = () => {
  return {
    type: BMI_ERROR,
  };
};

// action for bmi value or bmi history loading
export const bmiLoad = () => {
  return {
    type: BMI_LOADING,
  };
};

// async function for get bmi value
export const getBMIValue = (data, token) => async (dispatch) => {
  let config = {
    headers: { token },
  };
  dispatch(bmiLoad());
  try {
    let res = await axios.post(
      "https://terisoft.onrender.com/bmi/calculateBMI",
      data,
      config
    );
    if (res.data.status) {
      dispatch(bmivalSucc(res.data));
      return true;
    } else {
      dispatch(bmiFail());
      if (res.data.message === "jwt expired") {
        return res.data.message;
      }
      return false;
    }
  } catch (error) {
    dispatch(bmiFail());
    return false;
  }
};

// async function for get bmi history
export const getBMIHistory = (token) => async (dispatch) => {
  let config = {
    headers: { token },
  };
  dispatch(bmiLoad());
  try {
    let res = await axios.get(
      "https://terisoft.onrender.com/bmi/getCalculationHistory",
      config
    );
    if (res.data.status) {
      dispatch(bmihistSucc(res.data));
      return true;
    } else {
      dispatch(bmiFail());
      if (res.data.message === "jwt expired") {
        return res.data.message;
      }
      return false;
    }
  } catch (error) {
    dispatch(bmiFail());
    return false;
  }
};
