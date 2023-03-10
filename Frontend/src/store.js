import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer,productDetailsReducer } from "./reducers/ProductReducer";
import { authReducer } from "./reducers/UserReducers";
import { cartReducer } from "./reducers/CartReducer";
const reducer= combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    cart: cartReducer
})
let initialState={}
const middleware=[thunk];
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;