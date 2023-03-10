
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  CLEAR_ERRORS
} from "../constants/UserConstants";
import axios from "axios";
import { GET_CART_SUCCESS,GET_CART_REQUEST } from "../constants/CartConstants";
import { Cartget } from "./CartAction";

export const login = (email, password) => async (disptach) => {
  try {
    disptach({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    const authToken=data.token
    localStorage.setItem("JWT", authToken);
    disptach({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    disptach(Cartget())
  } catch (error) {
    disptach({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const RegisterUser = (userData) => async (disptach) => {
  try {
    disptach({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/register", userData, config);
    
    disptach({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    disptach({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const data  = await axios.get("/api/v1/getuser");
    const data1=data.data
   
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data1.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
    console.log(error)
  }
};

export const logout = () => async (disptach) => {
  try {
  const {data}= await axios.get("/api/v1/logout");

    disptach({
      type: LOGOUT_SUCCESS,
    });
    disptach({ type: GET_CART_REQUEST });
  } catch (error) {
    disptach({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });

  }
};
export const clearErrors = () => async (disptach) => {
  disptach({
    type: CLEAR_ERRORS,
  });
};
