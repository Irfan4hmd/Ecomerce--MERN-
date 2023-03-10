import React,{useState} from 'react'

import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import './cardstyle.css'
const Product = ({product}) => {
  const [rating, setRating] = useState(product.ratings) // initial rating value


    return (
         // https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg
         <div  className="col-sm-12 col-md-8 col-lg-4 my-3" >
          <div class="container page-wrapper">
  <div class="page-inner">
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
          <img class="img" src={product.images.url?product.images.url:"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} alt=""/>
          <div class="img-info">
            <div class="info-inner">
              
              <Link class="p-name" to={`/product/${product._id}`} style={{textDecoration:"none"}} > <h3> {product.name}</h3></Link>
              <span class="p-company">Yeezy</span>
            </div>
         
          </div>
        </div>

        <Rating 
                size={18} 
                ratingValue={rating}
                initialValue={3}
                transition={true}
                allowHover={false}
                readonly={true}
                />
        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner">
            
        
                
            </div>
          </div>

          <Link to={`/product/${product._id}`}  class="cart" >
            <span class="price">${product.price}</span>
            <span class="add-to-cart">
              <span class="txt">Add in cart</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
       
        </div>
    )
}

export default Product
