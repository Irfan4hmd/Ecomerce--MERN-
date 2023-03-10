import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loader from "./Loader";
import "rc-slider/assets/index.css";
import MetaData from "./MetaData";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";
import DelProduct from './DelProduct'
import UpdProduct from "./UpdProduct";
import axios from "axios";
const DeleteProduct = () => {
    const dispatch = useDispatch();
    const [price, setPrice] = useState([1, 100000]);
    const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
    const alert = useAlert();
    const { loading, products, error, productCount, resPerPage } = useSelector(
      (state) => state.products
    );
    
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentitems, setCurrentitems] = useState([]);
    const [hasMore,setHasMore]=useState(true);
    let productarr=[];
    useEffect(async() => {
      try {
        
        dispatch(getProducts(keyword,currentPage,price,category,rating))
    
     
      setCurrentitems(products)
      }
      catch (error) {
        console.log(error)
      }
    }, [dispatch,keyword,currentPage,price,category,rating])
      

    const fetchNextProducts=async()=>{
       
      setCurrentPage(currentPage+1);
      dispatch(getProducts(keyword,currentPage,price,category,rating))
    
      if(!products){
         setHasMore(false)

         console.log("this is !data.product")
         
         }
      else{
        console.log("this is !data.product else part")
         
        setCurrentitems([...currentitems, ...products]);
      }

  }
    console.log(currentitems)
  return (
<div>
      <div>
           <InfiniteScroll
           dataLength={products.length} //This is important field to render the next data
           next={fetchNextProducts}
           hasMore={hasMore}
           loader={<Loader/>}
      
      
         >
           <div className="container">
             <div className="row">
                {products&&products.map((product) => (
                     <UpdProduct key={product._id} product={product} />
                ))}
              </div>
              </div>
              </InfiniteScroll>  
    </div>
    
    </div>
  )
}

export default DeleteProduct