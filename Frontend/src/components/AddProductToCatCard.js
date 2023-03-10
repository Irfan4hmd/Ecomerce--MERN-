import axios from 'axios';
import React from 'react'

import { Link, useParams } from 'react-router-dom'

const AddProductToCatCard = ({key,product}) => {
    const {typo,categ}= useParams();
const type=typo;
const category= categ;
 const HandleClick=async()=>{
 
     const itemData={
         type:typo,
         category: categ
    }
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
const {data}= await axios.put(`/api/v1/category/addproduct/${product._id}`,itemData,config)
console.log(data)
 }

    return (
         // https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg
        <div key={key} className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={product.images.url}
              alt="No image"
            />
           
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to={`/product/${product._id}`} >{product.name}</Link>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style={{width:`${product.ratings/5*100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.noofreviews} Reviews)</span>
              </div>
              <p className="card-text">${product.price}</p>
              <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block" onClick={onclick} >View Details</Link>
              <button id="view_btn" className="btn btn-block" onClick={HandleClick}>Add Product</button>
            </div>
          </div>
        </div>
        
    )
}

export default AddProductToCatCard
