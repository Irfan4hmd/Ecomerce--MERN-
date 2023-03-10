import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
const CategoryProducts = (key,product) => {
  console.log(product)
   
  return (
    <div>
            <div key={key} className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src="nfjewnfoj"
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
              <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block" onClick={onclick} >View Details</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CategoryProducts