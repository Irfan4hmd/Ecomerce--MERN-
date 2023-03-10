import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { Alert } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { getProductDetails, clearErrors } from "../actions/productActions";

import { Cartpost } from "../actions/CartAction";
const ProductDetails = () => {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [quants, setQuants] = useState(1);
  const [reviews, setReviews] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  const disptach = useDispatch();
  const alert = useAlert();
  const ref = useRef(null);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
 
  const [rating, setRating] = useState(product.ratings); // initial rating value
  useEffect(async () => {
    if (error) {
      disptach(clearErrors());

      console.log(error);
    }
    disptach(getProductDetails(id));

    const revdata = await axios.get(`/api/v1/products/getreviews/${id}`);

    setReviews(revdata.data.reviews);
  }, [disptach, alert, error, id]);
  const [review, setReview] = useState({
    ratings: 0,
    comment: "",
    productId: "",
  });
  const AddToCart = async() => {
    try {
    const itemData = {
      name: product.name,
      price: product.price,
      product: product._id,
      images: product.images,
      quantity: quants,
    };
   
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.put("/api/v1/cart", itemData, config);
      console.log(data.success)
      if(data.success){
        window.location.reload()
      }
    } catch (error) {
      
      console.log(error)
    }
  };
   
    


  const { ratings, comment, productId } = review;
  const onchange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };
  const SubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const reviewData = {
        ratings: rating,
        comment,
        productId: id,
      };
     

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put("/api/v1/review", reviewData, config);

      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div>
            {
              show1&& <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Product added to cart</Alert.Heading>

            </Alert>
            }
            <div className="container container-fluid">
              <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                  {product.CarouselImages ? (
                    <Carousel fade={true} pause={false}>
                      {product&&product.CarouselImages&&product.CarouselImages.map((img) => (
                        <Carousel.Item interval={4000} key={img._id}>
                          <img
                            src={img.url}
                            alt="No image"
                            height="500"
                            width="500"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      src={
                        product.images
                          ? product.images.url
                          : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                      alt="No image"
                      className="carousel_item"
                      width="400"
                    />
                  )}
                </div>

                <div className="col-12 col-lg-5 mt-5">
                  <h3>{product.name}</h3>
                  <p id="product_id">Product-id: {product._id}</p>

                  <hr />
                  <Rating
                    size={18}
                    ratingValue={rating}
                    initialValue={3}
                    transition={true}
                    allowHover={false}
                    readonly={true}
                  />

                  <span id="no_of_reviews">
                    ({product.noofreviews} Reviews)
                  </span>

                  <hr />

                  <p id="product_price">${product.price}</p>
                  <div className="stockCounter d-inline">
                    <button
                      className="btn btn-danger minus"
                      disabled={quants === 1}
                      onClick={() => setQuants(quants - 1)}
                    >
                      -
                    </button>

                    <div className="form-control count d-inline">{quants}</div>

                    <span
                      className="btn btn-primary plus"
                      onClick={() => setQuants(quants + 1)}
                    >
                      +
                    </span>
                  </div>
                  <button
                    type="button"
                    id="cart_btn"
                    disabled={product.stock > 0 ? false : true}
                    onClick={AddToCart}
                    className="btn btn-primary d-inline ml-4"
                  >
                    Add to Cart
                  </button>

                  <hr />

                  <p>
                    Status:{" "}
                    <span
                      id="stock_status"
                      className={product.stock > 0 ? "greenColor" : "redColor"}
                    >
                      {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                    </span>
                  </p>

                  <hr />

                  <h4 className="mt-2">Description:</h4>
                  <p>
                   {product.description}
                  </p>
                  <hr />
                  <p id="product_seller mb-3">
                    Sold by: <strong>Amazon</strong>
                  </p>

                  <Button
                    variant="primary"
                    id="review_btn"
                    className="btn btn-primary mt-4"
                    onClick={handleShow}
                  >
                    Submit Your Review
                  </Button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title style={{color:"black"}}>Submit a Review</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={SubmitHandler}>
                      <Modal.Body>
                        <div className="row mt-2 mb-5" style={{color:"black"}}>
                        

                         <label htmlFor="comment"  > Enter Your Review</label>
                          <input
                            name="comment"
                            type="text"
                            onChange={onchange}
                            id="comment"
                            value={comment}
                            className="form-control mt-3"
                          />
                            <Rating
                            size={25}
                            ratingValue={rating}
                            initialValue={3}
                            transition={true}
                            onClick={handleRating}
                          />
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleClose}
                          type="submit"
                        >
                          Submit Review
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          {reviews&&reviews.map((review) => (
            <div className="container container-fluid" key={review._id}>
              <div className="reviews w-75">
                <h3>Product Reviews:</h3>
                <hr />
                <div className="review-card my-3">
                <Rating
                    size={18}
                    ratingValue={rating}
                    initialValue={3}
                    transition={true}
                    readonly={true}
                    allowHover={false}
                  />
                  <p className="review_user">by {review.name}</p>
                  <p className="review_comment">{review.comment}</p>

                  <hr />
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
