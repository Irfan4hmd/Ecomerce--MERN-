import axios from "axios";
import React, { useState, useEffect } from "react";
import {useSelector } from "react-redux";

import Loader from "./Loader";
const CreateProduct = () => {
  const [images, setImages] = useState("");
  const [cimages, setCimages] = useState([]);
  const [cimagesprev, setCimagesprev] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    
    seller: "",
    stock: "",
  });
  const[parentId,setParentId]=useState();
  const[category,setCategory]=useState();
  const[categoryId,setCategoryId]=useState('');
  const[subCategoryId,setSubCategoryId]=useState('');
  const[subsubCategoryId,setSubsubCategoryId]=useState('');
  const[categoryname,setCategoryname]=useState('');
  const[subCategoryname,setSubCategoryname]=useState('');
  const[subsubCategoryname,setSubsubCategoryname]=useState('');
  const[subCategory,setSubCategory]=useState('');
  const[subsubCategory,setSubsubCategory]=useState('');
  const [loading,setLoading]=useState(false)
  const { user } = useSelector((state) => state.auth);
  const { name, price, description, seller, stock } = product;
  useEffect(async () => {
    try{
      setLoading(true);
    const { data } = await axios.get("/api/v1/category");
    setCategory(data.categoryList);
    setLoading(false);
    }catch(error){
      console.log(error)
    }
  }, []);
  
let datac
const createCategoryList = (categori, options = []) => {
  
  for (let category of categori) {
    options.push({
      value: category._id,
      cat: category.children,
      name: category.name,
    });
  }

  return options;
};
  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      let CarouselImages=cimages
      const productData = {
        name,
        price,
        description,
        category:categoryname,
        subCategory: subCategoryname,
        subsubCategory: subsubCategoryname,
        images,
        CarouselImages,
        seller,
        stock,
        user,
      };
     
setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/v1/products/new",
        productData,
        config
      );
      setLoading(false);
      console.log(data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const onchange = (e) => {
    if (e.target.name === "productImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(reader.result);
          console.log(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
const newChange=(e)=>{
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.readyState === 2) {
      cimages.push(reader.result);
      cimagesprev.push(reader.result);
      setCimages(cimages);
      setCimagesprev(cimagesprev)
      console.log(cimages);
    }
  };
  reader.readAsDataURL(e.target.files[0]);

}
const selected=async(e) => {
  try{
 
  let Parent=e.target.value 
  console.log(Parent)
  for(let i in category){
    if(category[i]._id===Parent){
      setCategoryname(category[i].name)
      setSubCategory(category[i].children);
      
    }
  
  }
  setCategoryId(e.target.value)
  
  }catch(err){
    console.log(err.response.data.message)
  }
}


console.log(subCategory)
const selected1=async(e) => {
  try{

  let Parent=e.target.value
  for(let i in subCategory){
    if( subCategory[i]._id===Parent){
      setSubCategoryname(subCategory[i].name)
      setSubsubCategory(subCategory[i].children);
    }
  }
 
  }catch(err){
    console.log(err.response.data.message)
  }
  
}
const selected2=async(e) => {
  try{
    let Parent=e.target.value
    for(let i in subsubCategory){
      if(i._id===Parent){
        setSubsubCategoryname(i.name)
      }
    }
  setSubsubCategoryId(e.target.value)
  }catch(err){
    console.log(err.response.data.message)
  }
  
}
  return (
    
    <div>
      
      {
      loading?<Loader/>:(
      <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        method="post"
      >
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onchange}
            id="exampleFormControlInput1"
            style={{ width: "540px" }}
            placeholder="Enter Product Name"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Seller Name
          </label>
          <input
            type="text"
            className="form-control"
            name="seller"
            value={seller}
            onChange={onchange}
            id="exampleFormControlInput1"
            style={{ width: "540px" }}
            placeholder="Enter Seller Name"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Category
          </label>
        <select
          name='category'
          style={{ margin: "6px" }}
          id="category"
          onChange={selected}
        >
          <option>Select Category</option>
          
          { category&& createCategoryList(category).map((option) => (
            <option
              key={option.value}
              value={option.value}
              name={option.name}
            >
              {option.name}
            </option>
          ))}
        </select>
        <label for="exampleFormControlInput1" className="form-label">
            Sub Category
          </label>
        <select
         name="subCategory"
         style={{ margin: "6px" }}
         id="subCategory"
         onChange={selected1}
        >
           <option>Select Sub Category</option>
          { subCategory&& createCategoryList(subCategory).map((option) => (
            <option
              key={option.value}
              value={option.value}
              name={option.name}
            >
              {option.name}
            </option>
          ))}
        </select>
      
        <label for="exampleFormControlInput1" className="form-label">
            Sub Sub Category
          </label>
        <select
         name="subsubCategory"
         style={{ margin: "6px" }}
         id="subsubCategory"
         onChange={selected2}
        >
          <option>Select Sub Sub Category</option>
          { subsubCategory&& createCategoryList(subsubCategory).map((option) => (
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
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ width: "840px" }}
            placeholder="Enter Product Description"
            name="description"
            value={description}
            onChange={onchange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="Price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={price}
            onChange={onchange}
            placeholder="Enter Product Price"
            style={{ width: "440px" }}
            id="price"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Price" className="form-label">
            Product Type
          </label>
          <select  style={{ width: "540px" }} class="form-select" aria-label="Default select example">
            <option >Please Select Product Type</option>
            <option value="Featured Product">Featured Product</option>
            <option value="Top Product">Top Product</option>
            <option value="none">none</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="Stock" className="form-label">
            Stock:
          </label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={stock}
            onChange={onchange}
            placeholder="Enter total Stock available"
            style={{ width: "440px" }}
            id="Stock"
          />
        </div>
        
        <label htmlFor="productImage_upload" style={{padding:"15px" }}>Product Image:   </label>
        <div className="custom-file" 
            style={{ width: "540px",padding:"15px",paddingTop:"5px" }}>
          <label className="custom-file-label" htmlFor="customFile">
            Choose Image: 
          </label>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            name="productImage"
            accept="images/*"
            onChange={onchange}
          />
        </div>
      <div>
      <label htmlFor="CarouselImage_upload">Carousel Images:</label>
        <div className="custom-file"  style={{ width: "540px",padding:"15px",paddingTop:"5px" }}>
          <label className="custom-file-label" htmlFor="customFile">
            Choose Images: 
          </label>
          <div className='d-flex align-items-center'>
        
            {
              
              cimages&&cimagesprev.map((image)=>(
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={image}
                              className='rounded-circle'
                              alt='Avatar Preview'
                          />
                      </figure>
                  </div>
                 ))
              
                }
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            name="productImage"
            accept="images/*"
            
            onChange={newChange}
            multiple
          />
        </div>
   
        </div>

  </div>
        <button type="submit">Submit</button>
      </form>
      )
    }
    </div>
  );
};

export default CreateProduct;
