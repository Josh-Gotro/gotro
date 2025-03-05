import { useEffect, useRef } from 'react';
import './falling-letter.css';
import PropTypes from 'prop-types';

const FallingLetter = ({ left, removeLetter, id }) => {
  const letterRef = useRef(null);

  useEffect(() => {
    const delay = Math.random() * 5000;

    const transitionEnd = () => {
      removeLetter(id);
      if (letterRef.current) {
        letterRef.current.removeEventListener('transitionend', transitionEnd);
      }
    };

    const timeout = setTimeout(() => {
      if (letterRef.current) {
        letterRef.current.style.transition = 'transform 5s linear';
        letterRef.current.style.transform = 'translateY(100vh)';
        letterRef.current.addEventListener('transitionend', transitionEnd);
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (letterRef.current) {
        letterRef.current.removeEventListener('transitionend', transitionEnd);
      }
    };
  }, [removeLetter, id]);

  return (
    <div
      ref={letterRef}
      className="falling-letter"
      style={{
        left: `${left}%`,
        transform: 'translateY(-100%)', // Start completely above viewport
      }}
    >
      LOL
    </div>
  );
};

FallingLetter.propTypes = {
  left: PropTypes.number.isRequired,
  removeLetter: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default FallingLetter;
