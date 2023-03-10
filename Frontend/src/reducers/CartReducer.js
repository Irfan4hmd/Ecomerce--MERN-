import { 
  
    CART_SUCCESS,
    GET_CART_ERRORS,
    GET_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS
} from "../constants/CartConstants";
export const cartReducer =(state={cart:[]},action)=>{
    switch(action.type){
        case GET_CART_REQUEST:
            return{
            
                loading: true,
                cart:[],
                
            }
        case GET_CART_SUCCESS:
            return{
                loading: false,
                cart: action.payload.cart,
                
            }
        case 'DEL_CART_SUCCESS':
                return{
                    loading: false,
                    cart: action.payload,
                    
                }
        case GET_CART_FAIL:
            return{
                loading: true,
                error: action.payload
            }
        case GET_CART_ERRORS:
            return{
                ...state,
                error:null
            }
        case CART_SUCCESS:
            return{
                load: true,
            }
        default:
            return state;
    }
}
