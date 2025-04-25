import { useState, useCallback, useEffect } from 'react';
import { AiOutlineHome, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

import './gallery.css';

const Gallery = () => {
  // Dynamic import of all webp files from assets directory
  const imageModules = import.meta.glob('../../assets/*.webp', { eager: true });
  const images = Object.values(imageModules).map((module) => module.default);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const navigateImage = useCallback(
    (direction) => {
      setIsLoading(true);
      if (direction === 'next') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        );
      }
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigateImage]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateImage('next'),
    onSwipedRight: () => navigateImage('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="glass-container">
      <h1 className="glass-title">Gallery</h1>

      <div className="carousel-container" {...swipeHandlers}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="image-wrapper"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading && <div className="loader" />}
            <img
              className="glass-image"
              src={images[currentImageIndex]}
              alt={`Gallery item ${currentImageIndex + 1}`}
              onLoad={handleImageLoad}
            />
          </motion.div>
        </AnimatePresence>

        <button
          className="nav-button prev"
          onClick={() => navigateImage('prev')}
          aria-label="Previous image"
        >
          <AiOutlineLeft />
        </button>

        <button
          className="nav-button next"
          onClick={() => navigateImage('next')}
          aria-label="Next image"
        >
          <AiOutlineRight />
        </button>

        <div className="pagination">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => {
                setIsLoading(true);
                setCurrentImageIndex(index);
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Link to="/" className="home-icon" aria-label="Return to home">
        <AiOutlineHome size={24} />
      </Link>
    </div>
  );
};

export default Gallery;
