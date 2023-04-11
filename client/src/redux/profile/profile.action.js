import {
  PROFILE_ERROR,
  PROFILE_LOADING,
  PROFILE_SUCCESS,
} from "./profile.type";
import axios from "axios";

// action for successful profile
export const profileSucc = (payload) => {
  return {
    type: PROFILE_SUCCESS,
    payload,
  };
};

// action for profile error
export const profileFail = () => {
  return {
    type: PROFILE_ERROR,
  };
};

// action for profile load
export const profileLoad = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// async function for get profile
export const getProfile = (token) => async (dispatch) => {
  let config = {
    headers: { token },
  };
  dispatch(profileLoad());
  try {
    let res = await axios.get(
      "https://terisoft.onrender.com/profile/getProfile",
      config
    );
    console.log(res.data);
    if (res.data.status) {
      dispatch(profileSucc(res.data.result));
      return true;
    } else {
      dispatch(profileFail());
      return false;
    }
  } catch (error) {
    dispatch(profileFail());
    return false;
  }
};
