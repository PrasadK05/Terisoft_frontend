import {
  PRODUCT_ERROR,
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
} from "./bmi.type";

export const authLoginSucc = (payload) => {
  return {
    type: PRODUCT_SUCCESS,
    payload,
  };
};

export const authLoginFail = () => {
  return {
    type: PRODUCT_ERROR,
  };
};

export const authLoginLoad = () => {
  return {
    type: PRODUCT_LOADING,
  };
};



