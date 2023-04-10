import {
  BMI_ERROR,
  BMI_HISTORY_SUCCESS,
  BMI_LOADING,
  BMI_VALUE_SUCCESS,
} from "./bmi.type";
import axios from "axios";

export const bmivalSucc = (payload) => {
  return {
    type: BMI_VALUE_SUCCESS,
    payload,
  };
};

export const bmihistSucc = (payload) => {
  return {
    type: BMI_HISTORY_SUCCESS,
    payload,
  };
};

export const bmiFail = () => {
  return {
    type: BMI_ERROR,
  };
};

export const bmiLoad = () => {
  return {
    type: BMI_LOADING,
  };
};

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
