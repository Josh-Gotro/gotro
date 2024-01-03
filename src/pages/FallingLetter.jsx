
import { useEffect, useState, useRef } from 'react';
import './welcome.css';
import PropTypes from 'prop-types';

const FallingLetter = ({ left, removeLetter, id }) => {
  const [top, setTop] = useState(-10); // Start above the screen
  const letterRef = useRef(null);

  useEffect(() => {
    const delay = Math.random() * 5000; // Delay between 0 and 5000 milliseconds
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTop((prevTop) => {
          if (prevTop >= 100) {
            clearInterval(interval);
            removeLetter(id);
            return prevTop;
          }
          return prevTop + 1;
        });
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeLetter, id]);

  useEffect(() => {
    const updateAnimation = () => {
      if (letterRef.current) {
        letterRef.current.style.animation = `fall ${5}s linear infinite`;
        letterRef.current.style.animationName = 'none'; // Force a reflow
        setTimeout(() => {
          letterRef.current.style.animationName = '';
        }, 0);
      }
    };

    window.addEventListener('resize', updateAnimation);
    updateAnimation();

    return () => {
      window.removeEventListener('resize', updateAnimation);
    };
  }, []);

  return (
  <div
    ref={letterRef}
    style={{
      position: 'absolute',
      top: `${top}vh`, // Use viewport height units
      left: `${left}vw`, // Use viewport width units
      fontSize: '50px',
      width: '2%',
      overflow: 'visible', // Allow letters to overflow their width
      color: 'gold',
    }}
  >
    F
  </div>
  );
};

FallingLetter.propTypes = {
  left: PropTypes.number.isRequired,
  removeLetter: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default FallingLetter;