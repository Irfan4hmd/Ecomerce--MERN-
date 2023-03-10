import React from 'react';
import classNames from 'classnames';
import './SliderDemo.scss'
class CitiesSlider extends React.Component {
  constructor(props) {
    super(props);
    
    this.IMAGE_PARTS = 4;
    
    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;
    
    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }
  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }
  
  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }
  
  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }
  
  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }
  
  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      <div className={classNames('slider', { 's--ready': sliderReady })} style={{zIndex:"1"}}>
        <p className="slider__top-heading">Best In Town</p>
        <div className="slider__slides">
          {this.props.slides.map((slide, index) => (
            <div
              className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
              key={slide.city}
              >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                <h2 className="slider__slide-heading">
                  {slide.city.split('').map(l => <span>{l}</span>)}
                </h2>
                <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
              </div>
              <div className="slider__slide-parts">
                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slider__control" onClick={() => this.changeSlides(-1)} />
        <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
      </div>
    );
  }
}

const slides = [
  {
    city: 'Paris',
    country: 'France',
    img: 'https://assets.vogue.com/photos/61e9c42f201fe8db0bc39899/4:3/w_1600%2Cc_limit/00_promo.jpg',
  },
  {
    city: 'Singapore',
    img: 'https://www.abfrl.com/img/business/home/2022/Youth-Fashion.jpg',
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    img: 'https://img.freepik.com/premium-photo/two-fashion-black-men-fashionable-portrait-african-american-male-models-wear-suit-coat-hat_151355-7351.jpg?w=2000',
  },
  {
    city: 'Moscow',
    country: 'Russia',
    img: 'https://stylecaster.com/wp-content/uploads/2019/09/what-to-wear-for-fashion-week.jpg',
  },
];


const SliderDemo = () => {
  return (
    <CitiesSlider slides={slides} />
  )
}

export default SliderDemo