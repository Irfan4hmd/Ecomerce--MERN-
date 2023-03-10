import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loader from "./Loader";
import { Rating } from "react-simple-star-rating";
import "rc-slider/assets/index.css";
import MetaData from "./MetaData";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import Axios from "./Axios";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";
import axios from "axios";
import SliderView from "./SliderView";
import CatHome from "./CatHome";
import CatDemo from "./CatDemo";
import { Link } from "react-router-dom";
import SliderDemo from "./SliderDemo";
import ProductDemo from "./ProductDemo";
const Home = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([1, 100000]);
  const alert = useAlert();
  const { loading, products, error, resPerPage } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [ther, setTHer] = useState();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  function setCurrentPageNO(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const scrollY = () => {
    console.log("scrolling");
  };

  return (
    <div className="HomePage" id="outer-container">
      <CatDemo/>
      
      <div id="homeId">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={"Buy Best products Online"} />
            <SliderDemo/>
            <div className="co">
              <div class="container-fluid pt-5">
                <div class="row px-xl-5 pb-3">
                  <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                      class="d-flex align-items-center bg-light mb-4"
                      style={{ padding: "30px" }}
                    >
                      <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
                      <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                      class="d-flex align-items-center bg-light mb-4"
                      style={{ padding: "30px" }}
                    >
                      <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                      <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                      class="d-flex align-items-center bg-light mb-4"
                      style={{ padding: "30px" }}
                    >
                      <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                      <h5 class="font-weight-semi-bold m-0">14-Day Return</h5>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                      class="d-flex align-items-center bg-light mb-4"
                      style={{ padding: "30px" }}
                    >
                      <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                      <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
                    </div>
                  </div>
                </div>
              </div>
              <CatHome />
             
            </div>
            <div class="container-fluid pt-5 pb-3">
        <div class="row px-xl-5">
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height: "300px"}}>
                    <img class="img-fluid" src="https://st.depositphotos.com/1001094/3259/i/450/depositphotos_32593135-stock-photo-portrait-of-young-beautiful-fashionable.jpg" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <a href="" class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height: "300px"}}>
                    <img class="img-fluid" src="https://thumbs.dreamstime.com/b/fashion-pretty-cool-young-girl-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <a href="" class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
            <div className="container-fluid pt-5 pb-3">
              <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">Featured Products</span>
              </h2>
              <div className="row px-xl-5">
             {products&&products.map((product)=>(
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden">
                        <img class="img-fluid w-100" src={product.images.url?product.images.url:"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} alt=""/>
                        <div class="product-action">
                            <Link to={`/product/${product._id}`} class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></Link>
                           
                            <Link to={`/product/${product._id}`} class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></Link>
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <Link to={`/product/${product._id}`} class="h6 text-decoration-none text-truncate" href="">{product.name}</Link>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>${product.price}</h5><h6 class="text-muted ml-2"><del>${product.price}</del></h6>
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                        <Rating 
                size={18} 
                ratingValue={rating}
                initialValue={3}
                transition={true}
                allowHover={false}
                readonly={true}
                />
                        </div>
                    </div>
                </div>
            </div>
            ))}
              </div>
            </div>
          </Fragment>
        )}
        <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={products && products.length}
                onChange={setCurrentPageNO}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
      </div>
      
    </div>
  );
};

export default Home;
