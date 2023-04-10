import {
  PROFILE_ERROR,
  PROFILE_LOADING,
  PROFILE_SUCCESS,
} from "./profile.type";

export const profileSucc = (payload) => {
  return {
    type: PROFILE_SUCCESS,
    payload,
  };
};

export const profileFail = () => {
  return {
    type: PROFILE_ERROR,
  };
};

export const profileLoad = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const getProfile = (token) => async (dispatch) => {
  dispatch(profileLoad());
  
  try {
    let res = await fetch("", {
      method: "GET",
      headers: {
        token,
      },
    });
    res = await res.json();
    
    if (res.status) {
      dispatch(profileSucc(res.result));
      return true;
    } else {
      dispatch(profileFail());
      return false;
    }
  } catch (error) {
    alert("unable to load profile")
    dispatch(profileFail());
    return false;
  }
};


