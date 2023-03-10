import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image, ImageWithZoom,ButtonFirst,ButtonLast,DotGroup } from 'pure-react-carousel';
import s from 'pure-react-carousel/dist/react-carousel.es.css';

const ProductSlider = () => {
    return (
        <div>
      <CarouselProvider
        visibleSlides={1}
        totalSlides={8}
        step={15}
        naturalSlideWidth={0.002}
        naturalSlideHeight={0.003}
        hasMasterSpinner
        infinite
      >
        
        <Slider className={s.slider}>
      <Slide index={0}>
        <ImageWithZoom  className={s.ImageWithZoom} src="https://5.imimg.com/data5/BP/JW/MY-24289864/mens-full-sleeve-t-shirt-500x500.jpg" />
      </Slide>
      <Slide index={1}>
        <ImageWithZoom src="https://thumbs.dreamstime.com/b/fashion-pretty-cool-young-girl-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg" />
      </Slide>
      <Slide index={2}>
        <ImageWithZoom src="https://5.imimg.com/data5/BP/JW/MY-24289864/mens-full-sleeve-t-shirt-500x500.jpg"  />
      </Slide>
      <Slide index={3}>
        <ImageWithZoom src="https://thumbs.dreamstime.com/b/fashion-pretty-cool-young-girl-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg" />
      </Slide>
      <Slide index={4}>
        <ImageWithZoom src="https://thumbs.dreamstime.com/b/fashion-pretty-cool-young-girl-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg"  />
      </Slide>
      <Slide index={5}>
        <ImageWithZoom src="https://thumbs.dreamstime.com/b/fashion-pretty-cool-young-girl-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg"  />
      </Slide>
      <Slide index={6}>
        <ImageWithZoom className={s.ImageWithZoom} src="https://thumbs.dreamstime.com/b/fashion-pretty-cool-young-girl-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg"  />
      </Slide>
      <Slide index={7}>
        <ImageWithZoom className={s.ImageWithZoom} src="https://thumbs.dreamstime.com/b/fashion-pretty-cool-young-girl-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg"  />
      </Slide>
    </Slider>
      
        <ButtonFirst>First</ButtonFirst>
    <ButtonBack>Back</ButtonBack>
    <ButtonNext>Next</ButtonNext>
    <ButtonLast>Last</ButtonLast>
    <DotGroup />
      </CarouselProvider>
      
      </div>
    );
  }
export default ProductSlider