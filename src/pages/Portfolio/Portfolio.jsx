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
          <div className="tile-wrapper">
            <Link to="/portfolio/benefits" className="tile" title="Benefits Enrollment Demo">
              1
            </Link>
            <div className="tooltip">
              Benefits Enrollment Demo — Demos a small portion of a benefits enrollment system featuring a breadcrumb stepper and an accordion-based benefit selector, showcasing advanced state management and coordinated component interactions.
            </div>
          </div>

          <div className="tile-wrapper">
            <a
              href="https://juneau-pathfinder.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="tile"
              title="Juneau Pathfinder"
            >
              2
            </a>
            <div className="tooltip">
              Juneau Pathfinder —  Progressive web app that helps locals quickly quickly share directions to tourists to frequently requested destinations in Juneau, Alaska, and provides precise GPS coordinates for hard-to-find trailheads. Trailhead entries include parking and mile‑marker details and are available offline beyond cellular coverage.
            </div>
          </div>

          <div className="tile-wrapper">
            <a
              href="https://flippinbirds.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="tile"
              title="KOBA"
            >
              3
            </a>
            <div className="tooltip">
              Bird Strike Tracker — A university employee asked for a simple tool to track bird strikes on campus so the information could be used to request funding for prevention efforts.
            </div>
          </div>
        </div>
      </div>

      <Link to="/" className="home-icon">
        <AiOutlineHome size={24} />
      </Link>
    </>
  );
};

export default Portfolio;
