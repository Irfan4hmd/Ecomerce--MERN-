import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
const DelProduct = ({key,product}) => {
const  handleClick=async()=>{
    try {
      
      const {data}=await axios.delete(`/api/v1/product/${product._id}`)
      if(data.success){
       window.location.reload()
      }
      
      console.log(data)
  } catch (error){
      console.log(error.response.data.message)
  }
  }
  return (
   




         // https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg
       
        <div key={key} className="col-sm-12 col-md-6 col-lg-3 my-3">
        
          <div className="card p-3 rounded">
            <span style={{marginLeft:"250px",cursor:"pointer"}}>
          <i className='fas fa-trash' onClick={handleClick} ></i>
          </span>
            <img
              className="card-img-top mx-auto"
              src={product.images&& product.images.url}
              alt="No image"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style={{width:`${product.ratings/5*100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.noofreviews} Reviews)</span>
              </div>
              <p className="card-text">${product.price}</p>
              <i class="fa-solid fa-trash-can"></i>
              
              <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block" onClick={onclick} >View Details</Link>
            </div>
          </div>
         
        </div>
         
    )
}

export default DelProduct