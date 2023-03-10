import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { pushRotate as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import './Category.css'

import SliderView from './SliderView'


const CatDemo = () => {
  const [category,setCategory]=useState([]);
  const [categoryId,setCategoryId]=useState();
  useEffect(async () => {
    const { data } = await axios.get("/api/v1/category");
    setCategory(data.categoryList);
    
  })
  
  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push(
        <li key={category.name}>
          <Link onClick={() =>{setCategoryId(category._id)}}>{category.name} </Link>
          
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    
    return mycategories;
  }
 
  return (
   
         <Menu width={250} id={ "sidebar" } pageWrapId={ "homeId" } outerContainerId={"outer-container"}   className={ "my-menu" }  >
          <h1>Categories</h1>
        <div className="menuHeader">
            <ul >{renderCategories(category)} </ul>
          
            </div>
          

      </Menu>
   
     
  )
}

export default CatDemo