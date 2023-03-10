import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const GetRev = (props) => {
    const id=props._id
    const [reviews,setReviews]=useState([])
    useEffect(async()=>{
        const revdata=await axios.get(`/api/v1/products/getreviews/${id}`)
        console.log(revdata.data.reviews)
        setReviews(revdata.data.reviews)
    },[])
    
  return (
    <div>
        {
            reviews.map((review)=>{
         <div className="container container-fluid">
		<div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
                <div className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>
                    <p className="review_user">by {review.name}</p>
                    <p className="review_comment">{review.comment}</p>

                    <hr />
                </div>
        </div>
    </div>
})
}
    </div>
  )
}

export default GetRev