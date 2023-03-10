import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loader from "./Loader";

import "rc-slider/assets/index.css";
import MetaData from "./MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";
import UpdProduct from './UpdProduct'

const UpdateProduct = () => {
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
    useEffect(() => {
      if (error) {
        return alert.error(error);
      }
      dispatch(getProducts(keyword, currentPage, price,category,rating));
    }, [dispatch, alert, error, keyword, currentPage, price,category,rating]);
    function setCurrentPageNO(pageNumber) {
      setCurrentPage(pageNumber);
    }
  return (
<div>
     { loading? (<Loader/>):(<div>
       <div className="row">
                {products.map((product) => (
                  <UpdProduct key={product._id} product={product} />
                ))}
              </div>
      
        
      
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNO}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
         
    </div>
    )}
    </div>
  )
}

export default UpdateProduct