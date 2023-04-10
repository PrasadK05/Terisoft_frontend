import {
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_LOADING,
  AUTH_LOG_IN_SUCCESS,
} from "./auth.type";
import Cookies from "js-cookie";
import axios from "axios";

export const authLoginSucc = (payload) => {
  return {
    type: AUTH_LOG_IN_SUCCESS,
    payload,
  };
};

export const authLoginFail = () => {
  return {
    type: AUTH_LOG_IN_ERROR,
  };
};

export const authLoginLoad = () => {
  return {
    type: AUTH_LOG_IN_LOADING,
  };
};

export const signupProcess = async (data) => {
  try {
    let res = await axios.post(
      "https://terisoft.onrender.com/user/register",
      data
    );

    if (res.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const loginProcess = (data) => async (dispatch) => {
  dispatch(authLoginLoad());
  try {
    let res = await axios.post(
      "https://terisoft.onrender.com/user/login",
      data
    );
    if (res.data.status) {
      dispatch(authLoginSucc(res.data));
      Cookies.set("token", res.data.token);
      return true;
    } else {
      dispatch(authLoginFail());
      return false;
    }
  } catch (error) {
    dispatch(authLoginFail());
    return false;
  }
};
