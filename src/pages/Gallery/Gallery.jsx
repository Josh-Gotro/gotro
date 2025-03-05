import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './gallery.css';

const Gallery = () => {
  // Dynamic import of all webp files from assets directory
  const imageModules = import.meta.glob('../../assets/*.webp', { eager: true });
  const images = Object.values(imageModules).map((module) => module.default);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="glass-container">
      <h1 className="glass-title">{`---->`}</h1>
      <div className="carousel">
        <div className="image-wrapper">
          <img
            className="glass-image"
            src={images[currentImageIndex]}
            alt={`Glass ${currentImageIndex + 1}`}
          />
        </div>
        <div className="button-container">
          <button onClick={prevImage}>Previous</button>
          <button onClick={nextImage}>Next</button>
        </div>
      </div>
      <Link to="/" className="home-icon">
        <AiOutlineHome size={24} />
      </Link>
    </div>
  );
};

export default Gallery;
