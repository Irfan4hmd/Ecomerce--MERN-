import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_ERRORS,
    ALL_PRODUCTS_DETAILS_SUCCESS,
    ALL_PRODUCTS_DETAILS_FAIL,
    ALL_PRODUCTS_DETAILS_REQUEST,
   
    } from '../constants/ProductConstants'


export const productsReducer =(state={products:[]},action)=>{
    switch(action.type){
        case ALL_PRODUCTS_REQUEST:
            return{
            
                loading: true,
                products:[],
                
            }
        case ALL_PRODUCTS_SUCCESS:
            return{
                loading: false,
                products:action.payload.product,
                productCount:action.payload.productCount,
                resPerPage:action.payload.resPerPage
            }
        case ALL_PRODUCTS_FAIL:
            return{
                loading: true,
                error: action.payload
            }
        case ALL_PRODUCTS_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}
export const productDetailsReducer=(state={product:{}},action)=>{
    switch (action.type){
        case ALL_PRODUCTS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case ALL_PRODUCTS_DETAILS_SUCCESS:
            return {
                loading : false,
                product: action.payload
            }
            case ALL_PRODUCTS_DETAILS_FAIL:
                return {
                    ...state,
                    error: action.payload
                }  
            case  ALL_PRODUCTS_ERRORS:
                    return {
                        ...state,
                        error:null
                    }  
        default:
            return state
    }
}