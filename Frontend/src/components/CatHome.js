import React,{useState,useEffect} from 'react'
import './CatHome.css'
import './css/style.css'
import axios from 'axios'
const CatHome = () => {
const [category, setCategory] = useState([])
useEffect(async() => {
 const {data}=await axios.get('/api/v1/justcategory')
 setCategory(data.category)

}, [])
  return (
    <div style={{backgroundColor:"fbf4dc"}}>
        <div className="container">
   
    <div className="d-flex justify-content-center align-items-center mt-5"> <button className="btn01 btn-dark">OUR CATEGORIES</button> </div>
    <div className="d-flex justify-content-center mt-3"> <span className="text text-center">Finding Best Products Now<br/> in Your Fingertips</span> </div>
    <div className="row mt-2 g-4">
    
       {
        category&&category.map((cat)=>(
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href="">
                <div className="cat-item d-flex align-items-center mb-4">
                    <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                        <img className="img-fluid" src={cat.images?cat.images.url:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} alt=""/>
                    </div>
                    <div className="flex-fill pl-3">
                        <h6 style={{color: "CaptionText"}}>{cat.name}</h6>
                        <small className="text-body">100 Products</small>
                    </div>
                </div>
            </a>
        </div>
        ))
       }
    </div>
</div>
    </div>
  )
}

export default CatHome