import React, { useState, useEffect } from 'react';
import '../css/custom_carousel.css'; // Make sure to create this CSS file for styling
import img1 from '../img/rasoi_logo_banner.png';
import { Button } from 'react-bootstrap';
import prev from '../img/icons8-previous-50.png';
import next from '../img/icons8-next-50.png';

const CustomCarousel = (props) => {
  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    console.log(props.pictures)
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getImagesArr = () => {
    if(!props.pictures || props.pictures.length == 0)
      setImages([img1]);
    else
      setImages(props.pictures);
      
  }
  useEffect(()=>{
    console.log('Images '+props.pictures);
    getImagesArr();
  },[])

  return (
    <div className="custom-carousel" style={{ backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around', alignItems: 'center', width:'100%' }}>
      <div style={{ display:'flex', width: '10%', textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
        <div style={{ cursor: 'pointer'}}>
          <label
            htmlFor="custom-file-input"
            className='img-icon'
            style={{ backgroundImage: `url(${prev})`, borderRadius: '25px' }}
            onClick={handlePrevClick}
          ></label>
        </div>
      </div>
      <div className="image-container" style={{ width: '80%', backgroundColor: 'black' }}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="image-transition"
          style={{ width: '100%', height: '50vh', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      <div style={{ display:'flex', width: '10%', textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
        <div style={{ cursor: 'pointer'}}>
          <label
            htmlFor="custom-file-input"
            className='img-icon'
            style={{ backgroundImage: `url(${next})`, borderRadius:'25px' }}
            onClick={handleNextClick}
          ></label>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
