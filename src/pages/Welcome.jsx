
import { useEffect, useState } from 'react';
import FallingLetter from './FallingLetter';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

const Welcome = () => {
  const [letters, setLetters] = useState([]);
  const [nextId, setNextId] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.random() * 100;
      setLetters((prevLetters) => [...prevLetters, { id: nextId, left }]);
      setNextId((prevId) => prevId + 1);
    }, 1000); // Create a new letter every 1000 milliseconds

    return () => {
      clearInterval(interval);
    };
  }, [nextId]);

  const removeLetter = (id) => {
    setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== id));
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'visible' }}>
      {letters.map((letter) => (
        <FallingLetter key={letter.id} {...letter} removeLetter={removeLetter} />
      ))}
      <button className="main-button" onClick={() => navigate('/ms')}>
        CLICK
      </button>
    </div>
  );
};

export default Welcome;