import React from "react";
import { useEffect, useState } from "react";
import './css/style.css'
import axios from 'axios'
const SliderView = () => {
  const [sliderImages, setSliderImages] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const { data } = await axios.get("/api/v1/slider");
      setSliderImages(data.slider);
    }
    fetchdata();
  }, []);
  console.log(sliderImages)
  let firstSlide
  const slide=()=>{
   firstSlide = sliderImages.shift();
  }
  if(sliderImages){
slide();
  }
  return (
    <div>
      <div
        id="template-mo-jassa-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
        
      >
        <div className="carousel-inner">
          <div className="carousel-item active" key={firstSlide && firstSlide._id}>
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src={firstSlide && firstSlide.images.url}
                    alt="First slide"
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1 text-success">
                      <b>{firstSlide && firstSlide.Heading} </b>
                    </h1>
                    <h3 className="h2">
                      {firstSlide && firstSlide.Subheading}
                    </h3>
                    <p>{firstSlide && firstSlide.Content} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(sliderImages)&&sliderImages.map((slider) => (
            <div className="carousel-item" key={slider._id}>
              <div className="container" >
                <div className="row p-5">
                  <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                    <img className="img-fluid" src={slider.images.url} alt="" />
                  </div>
                  <div className="col-lg-6 mb-0 d-flex align-items-center">
                    <div className="text-align-left">
                      <h1 className="h1 text-success">{slider.Heading}</h1>
                      <h3 className="h2">{slider.SubHeading}</h3>
                      <p>{slider.Content} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <a
            className="carousel-control-prev text-decoration-none w-auto ps-3 "
            href="#template-mo-jassa-hero-carousel"
            role="button"
            data-bs-slide="prev"
          >
            <i className="fas fa-chevron-left"></i>
          </a>
          <a
            className="carousel-control-next text-decoration-none w-auto pe-3"
            href="#template-mo-jassa-hero-carousel"
            role="button"
            data-bs-slide="next"
          >
            <i className="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SliderView;
