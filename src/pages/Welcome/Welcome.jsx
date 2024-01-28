
import { useEffect, useState } from 'react';
import FallingLetter from '../../components/FallingLetter/FallingLetter';
import './welcome.css';
import SearchBox from '../../components/SearchBox/SearchBox';

const Welcome = () => {
  const [letters, setLetters] = useState([]);
  const [nextId, setNextId] = useState(0);


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
      <SearchBox />
    </div>
  );
};

export default Welcome;