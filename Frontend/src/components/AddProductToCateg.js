import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Product from './Product';
import InfinitScroll from 'react-infinite-scroll-component'
import Loader from './Loader';
import AddProductToCatCard from './AddProductToCatCard';
const AddProductToCateg = () => {
    const { categ, typo } = useParams();
    const [products,setProducts]=useState([]);
    const [pageno,setPageno]=useState(1)
    const[hasMore,setHasMore]=useState(true)
    useEffect(async() => {
        try {
            const {data}= await axios.get(`/api/v1/category/excproduct/${categ}/${typo}?&page=${pageno}`)
            
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        }

    }, [])
    const fetchNextProducts=async()=>{
       
        
        setPageno(pageno+1);
        const {data}= await axios.get(`/api/v1/category/excproduct/${categ}/${typo}?&page=${pageno}`)
        
            
        if(!data.products){
           setHasMore(false)
           
        }else{
            setProducts([...products, ...data.products]);
        }

    }
    
  return (
    <div>
   <div>
<InfinitScroll
        dataLength = {products.length}
        next = {fetchNextProducts}
        hasMore = {hasMore}
        loader={<Loader/>}
     
      >
      <div className="container">
        <div className="row">
 {
     products.map(product=>(
      <AddProductToCatCard key={product._id} product={product} />
     
      ))
  
}</div>
</div>
      </InfinitScroll>
      </div>
     
    </div>
  )
}

export default AddProductToCateg