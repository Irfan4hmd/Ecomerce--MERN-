import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./Category.css";

import {
  Modal,
  Button,
  Accordion,
  Card,
  useAccordionToggle,
} from "react-bootstrap";
import Loader from "./Loader";
const Category = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(true);
  const [lala, setLala] = useState();
  const [type, setType] = useState(null);
  const { categ, typo } = useParams();
  const [images,setImages]=useState();
  useEffect(async () => {
    const { data } = await axios.get("/api/v1/category");
    setCategory(data.categoryList);
    console.log(data)
    if (typo && categ) {
      const { data } = await axios.get(
        `/api/v1/category/product/${categ}/${typo}`
      );
      setProducts(data.products);
    }
    setLoading(false);
  }, []);
  const onchange = (e) => {
    if (e.target.name === "CatImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(reader.result);
          
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } 
  }
  const [products, setProducts] = useState([]);
  const clickHandle = async (category) => {
    try {
     
      if (!category.parentId) {
        setType("Category");
        history.push(`/category/${category.name}/category`);
        const { data } = await axios.get(
          `/api/v1/category/product/${category.name}/category`
        );
        setProducts(data.products);
        setLoading(false);
      }
      if (category.parentId && category.children.length > 0) {
        setType("subCategory");
        history.push(`/category/${category.name}/subCategory`);
        const { data } = await axios.get(
          `/api/v1/category/product/${category.name}/subCategory`
        );
        setProducts(data.products);
        setLoading(false);
      }
      if (category.parentId && category.children.length === 0) {
        setType("subsubCategory");
        history.push(`/category/${category.name}/subsubCategory`);
        const { data } = await axios.get(
          `/api/v1/category/product/${category.name}/subsubCategory`
        );
        setProducts(data.products);
        setLoading(false);
      }
      
      
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        cat: category.children,
        name: category.name,
      });
    }

    return options;
  };
  const delCatFromProd=async(productId)=>{
  const {data}= await axios.delete(`/api/v1/category/addproduct/${productId}`)
  if(data.success){
    const product= products.filter(product=>product._id!==productId)
    setProducts(product)
  }
console.log(data,products)
  }

  const createSubCategoryList = (categories, options = []) => {
    for (let category of categories) {
      if (category.children.length > 0) {
        for (let categ of category.children) {
          options.push({ value: categ._id, name: categ.name });
        }
      }
    }

    return options;
  };
  const DelCateg=async()=>{
    const {data}= await axios.delete(`/api/v1/delcategory/${categoryId}`)
    console.log(data)
    if(data.success){
      history.push('/category');
      window.location.reload();
    }
  }
  const CreateCategory = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body;
    const name = categoryName;
    if (parentId) {
      body = {
        name,
        parentId,
        images
      };
    } else {
      body = {
        name,
        images
      };
    }

    const { data } = await axios.post("/api/v1/category", body, config);
    if(data.success){
      setShow(false);
      window.location.reload()
    }
    console.log(data);
  };
  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push(
        <li key={category.name}>
          <Link onClick={() =>{setCategoryId(category._id); clickHandle(category)}}>{category.name} </Link>

          {category.children.length > 0 ? (
            
            <ul>{renderCategories(category.children)}</ul>
           
          ) : null}
        </li>
      );
    }

    return mycategories;
  };
const selected=async(e) => {
  try{
  setParentId(e.target.value);
  for(let i in category){
    if(e.target.value===category[i]._id){
      setLala(category[i].children)
    }
  }
  }catch(err){
    console.log(err.response.data.message)
  }
  
}

  return (
    <div>
      <div className="menuHeader">
        <ul>{renderCategories(category)} </ul>
        {typo&&categ?<Link className="topright" to={`/addProductToCateg/${typo}/${categ}`} >Add Product
        <i
            className="fa fa-plus-square fa-2x"
            style={{ margin: "12px" }}
            onClick={handleShow}
            aria-hidden="true"
          ></i>
        </Link>:<div>
        <h4 className="topright">
          {" "}
          Create Category{" "}
          <i
            className="fa fa-plus-square fa-2x"
            style={{ margin: "12px" }}
            onClick={handleShow}
            aria-hidden="true"
          ></i>
        </h4>
        </div>}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <form onSubmit={CreateCategory}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Category-Name:</label>
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <small className="form-text text-muted">
              Please enter the category name
            </small>
            <div className="custom-file">
          <label className="custom-file-label" htmlFor="customFile">
            Choose Image: 
          </label>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            name="CatImage"
            accept="images/*"
            onChange={onchange}
          />
        </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Category:</label>
              <select
                name="category"
                style={{ margin: "6px" }}
                id="category"
                onChange={selected}
              >
                <option>Select Category</option>
                {createCategoryList(category).map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    name={option.name}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <small className="form-text text-muted">
              Please select the Parent category if it is a Sub-Category
            </small>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Sub-Category:</label>
              <select
                style={{ margin: "6px" }}
                name="subcategory"
                id="subcategory"
                onChange={(e) => setParentId(e.target.value)}
              >
                <option>Select Sub-Category</option>
                {lala&&createCategoryList(lala).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <small className="form-text text-muted">
              Please select the Parent Sub-Category if it is a Sub-Sub-Category
            </small>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {products ? (
            <div>
            {products.map((product) => (
              <div className="CategProd">
               
               
                
                <div
                  key={product.name}
                  className="col-sm-12 col-md-6 col-lg-3 my-3"
                >
                  
                  <div className="card p-3 rounded">
                    <img
                      className="card-img-top mx-auto"
                      src={product.images.url}
                      alt="No image"
                    />
                  
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                        <i className="fas fa-solid fa-trash" onClick={()=>delCatFromProd(product._id)} style={{marginLeft:"15px",
                      cursor:"pointer"
                      }}> </i>
                      </h5>
                      
                      <div className="ratings mt-auto">
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${(product.ratings / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span id="no_of_reviews">
                          ({product.noofreviews} Reviews)
                        </span>
                      </div>
                      <p className="card-text">${product.price}</p>
                      <Link
                        to={`/product/${product._id}`}
                        id="view_btn"
                        className="btn btn-block"
                        onClick={onclick}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                
                
              </div>
           
            ))}
            
              </div> 
          ) : (
            <div><button onClick={DelCateg}>Delete This Category</button></div>
          )}
         
        </div>
      )}
      
    </div>
  );
};

export default Category;
