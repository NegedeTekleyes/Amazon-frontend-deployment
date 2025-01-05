import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { img } from './img/data'; // Ensure this file exports an array of image URLs
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './Carousel.module.css';

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={true}
        renderThumbs={() => 
          img.map((src, index) => <img key={index} src={src} alt={`thumb-${index}`} />)
        }
      >
        {img.map((imageItemLink, index) => (
          <img key={index} src={imageItemLink} alt={`slide-${index}`} />
        ))}
      </Carousel>
      <div className={styles.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;
