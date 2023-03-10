
import { 
    CART_SUCCESS,
    CART_ERRORS,
    CART_FAIL,
    CART_REQUEST,
    GET_CART_ERRORS,
    GET_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS
} from "../constants/CartConstants";
import Axios from '../components/Axios'
import axios from 'axios'
export const Cartpost = (itemData) => async (disptach) => {
    try {
      disptach({ type: CART_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.put("/api/v1/cart", itemData, config);
      
      disptach({
        type: CART_SUCCESS
      });
    } catch (error) {
      disptach({
        type: CART_FAIL,
        payload: error.response.data.message,
      });
      console.log(error.response.data.message)
    }
  };
  export const Cartget = () => async (disptach) => {
    try {
      disptach({ type: GET_CART_REQUEST });
      
  
      const { data } = await axios.get("/api/v1/cart");
      
      disptach({
        type: GET_CART_SUCCESS,
        payload: data
      });
    } catch (error) {
      disptach({
        type: GET_CART_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const clearErrors = () => async (disptach) => {
    disptach({
      type: GET_CART_ERRORS,
    });
  };
