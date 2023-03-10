import { ALL_PRODUCTS_ERRORS, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS,
ALL_PRODUCTS_DETAILS_FAIL,
ALL_PRODUCTS_DETAILS_REQUEST,
ALL_PRODUCTS_DETAILS_SUCCESS
} from "../constants/ProductConstants";
import axios from "axios";


export const getProducts=(keyword='',currentPage=1,price,category,rating=4)=>async(dispatch)=>{
    
    try {
        dispatch({type:ALL_PRODUCTS_REQUEST})
        
        let link =`/api/v1/products?&page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
        if(category){
            link =`/api/v1/products?&page=${currentPage}&keyword=${keyword}&category=${category}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
        }
        
        const data=await axios.get(link)
      
        const data1=data.data
        console.log(data);
        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data1
        })
        
    } catch (error) {
       
        console.log(error);
    }
}
export const getProductDetails=(id)=>async(disptach)=>{
    
    try {
        disptach({type:ALL_PRODUCTS_DETAILS_REQUEST})
        const {data}=await axios.get(`/api/v1/product/${id}`)
        disptach({
            type:ALL_PRODUCTS_DETAILS_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        disptach({
            type: ALL_PRODUCTS_DETAILS_FAIL,
            payload: error
        })
    }
}
export const clearErrors=()=>async(disptach)=>{
    disptach({
        type:ALL_PRODUCTS_ERRORS
    })
}