import { useEffect, useState } from 'react';
import FallingLetter from '../../components/FallingLetter/FallingLetter';
import './portfolio.css';
// import SearchBox from '../../components/SearchBox/SearchBox';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [letters, setLetters] = useState([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.random() * 100;
      setLetters((prevLetters) => [...prevLetters, { id: nextId, left }]);
      setNextId((prevId) => prevId + 1);
    }, 2000); //  2 seconds between drops

    return () => {
      clearInterval(interval);
    };
  }, [nextId]);

  const removeLetter = (id) => {
    setLetters((prevLetters) =>
      prevLetters.filter((letter) => letter.id !== id)
    );
  };

  return (
    <>
      <div className="letters-container">
        {letters.map((letter) => (
          <FallingLetter
            key={letter.id}
            {...letter}
            removeLetter={removeLetter}
          />
        ))}
        {/* <SearchBox /> */}
      </div>

      <div className="floating-card">
        <div className="tiles-container">
          <Link to="/portfolio/benefits" className="tile" title="benefits">
            1
          </Link>
          <Link to="/portfolio/tbd" className="tile" title="tbd">
            2
          </Link>
          <Link to="/portfolio/alsotbd" className="tile" title="alsotbd">
            3
          </Link>
        </div>
      </div>

      <Link to="/" className="home-icon">
        <AiOutlineHome size={24} />
      </Link>
    </>
  );
};

export default Portfolio;
