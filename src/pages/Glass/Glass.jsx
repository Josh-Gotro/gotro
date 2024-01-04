import { useState } from 'react';
import image1 from '../../assets/agave-crown-profile.JPG';
import image2 from '../../assets/agave-crown-sunlight.JPG';
import image3 from '../../assets/cacti-trio-wip.JPG';
import image4 from '../../assets/cacti-trio-wip2.JPG';
import image5 from '../../assets/chess-wip.JPG';
import image6 from '../../assets/first-cactus.JPG';
import './glass.css';


const Glass = () => {
  const images = [image1, image2, image3, image4, image5, image6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <h1>Glass</h1>
      <div className="carousel">
        <img className="glass-image" src={images[currentImageIndex]} alt={`Glass ${currentImageIndex + 1}`} />
        <div className="button-container">
          <button onClick={prevImage}>Previous</button>
          <button onClick={nextImage}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Glass;