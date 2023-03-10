import React, { useState, useEffect } from "react";
import axios from "axios";

import { Carousel } from "react-bootstrap";
const Slider = () => {
  const [images, setImages] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [content, setContent] = useState("");
  useEffect(async () => {
    const { data } = await axios.get("/api/v1/slider");

    setSliderImages(data.slider);
  }, []);
  const firstSlide = sliderImages.shift();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = {
        images,
        Heading: heading,
        SubHeading: subHeading,
        Content: content,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/slider", body, config);
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const DelSlider = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/slider/${id}`);
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const onchange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        images.push(reader.result);
        setImages(images);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
              
      <div
        id="template-mo-jassa-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <i
              className="fas fa-trash"
              style={{ marginLeft: "1100px" }}
              onClick={() => DelSlider(firstSlide._id)}
            ></i>
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="image-fluid"
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

          {sliderImages.map((slider) => (
            <div className="carousel-item">
              <i
                className="fas fa-trash"
                style={{ marginLeft: "1100px" }}
                onClick={() => DelSlider(slider._id)}
              ></i>

              <div className="container">
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

      <form onSubmit={submitHandler} className="slider_content">
        <input
          type="file"
          name="sliderimage"
          style={{ margin: "30px" }}
          onChange={onchange}
          id="sliderimage"
        />
        <div>
          <label htmlFor="Heading">Heading:</label>
          <input
            type="text"
            name="Heading"
            style={{ margin: "25px", width: "880px" }}
            className="form-control"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <label htmlFor="SubHeading">SubHeading:</label>
          <input
            type="text"
            name="SubHeading"
            style={{ margin: "25px", width: "880px" }}
            className="form-control"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
          />
          <label htmlFor="Content">Content:</label>
          <input
            type="text"
            name="Content"
            style={{ margin: "25px", width: "880px", height: "150px" }}
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Slider;
