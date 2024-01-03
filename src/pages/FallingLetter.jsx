import { useEffect, useRef } from 'react';
import './welcome.css';
import PropTypes from 'prop-types';

const FallingLetter = ({ left, removeLetter, id }) => {
  const letterRef = useRef(null);

  useEffect(() => {
    const delay = Math.random() * 5000; // Delay between 0 and 5000 milliseconds

    const transitionEnd = () => {
      removeLetter(id);
      if (letterRef.current) {
        letterRef.current.removeEventListener('transitionend', transitionEnd);
      }
    };

    const timeout = setTimeout(() => {
      if (letterRef.current) {
        letterRef.current.style.transition = 'top 5s linear';
        letterRef.current.style.top = '100%';
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
      className="falling-letter"
      style={{ left: `${left}%`, top: '-10%' }}
    >
      LOL
    </div>
  );
};

FallingLetter.propTypes = {
  left: PropTypes.number.isRequired,
  removeLetter: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default FallingLetter;