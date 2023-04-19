import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../images/sunset-gbc58e7d26_1920 (1).jpg"
import image2 from "../images/marriage-g98f1962cc_1920.jpg"
import image3 from "../images/wedding-ge031074c9_1920.jpg"

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
      
        />
        <Carousel.Caption>
          <h1>Beautiful Wedding Venues</h1>
          <p className='fs-5 fw-semibold fst-italic'>Discover a vast selection of amazing venues located in breathtaking destinations all over the world, and take the first step towards finding your dream location by checking out our comprehensive list of options today.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        
        />

        <Carousel.Caption>
          <h1>Special offers for a special day</h1>
          <p className='fs-5 fw-semibold fst-italic'>When you book with us, you're not just securing a location – you're reserving a spot that will stay in your memory forever. Many of our venues offer special packages that include everything you need for your special day, so you can relax and enjoy without worrying about extra costs.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        
        />

        <Carousel.Caption>
          <h1>Register and book today!</h1>
          <p className='fs-5 fw-semibold fst-italic'>
          Full access to our platform is available only for registered users. Register for free and book your perfect venue before someone else does!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;