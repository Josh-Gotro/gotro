import { useEffect, useState } from 'react';
import FallingLetter from '../../components/FallingLetter/FallingLetter';
import './portfolio.css';
// import SearchBox from '../../components/SearchBox/SearchBox';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [letters, setLetters] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [hoveredTile, setHoveredTile] = useState(null);

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

  const handleTileHover = (tileId) => {
    setHoveredTile(tileId);
  };

  const handleTileLeave = () => {
    setHoveredTile(null);
  };

  const renderGifPreview = () => {
    if (!hoveredTile) {
      return (
        <div className="gif-preview-default">
          <p>Hover over each number below to see a demo preview</p>
          <p>Click to redirect to demo or live version</p>
        </div>
      );
    }

    // For now using placeholder content - you can replace with actual GIF URLs later
    const gifs = {
      1: {
        url: '/demo-gifs/benefits-demo.gif', // Placeholder path
        alt: 'Benefits Enrollment Demo Preview'
      },
      2: {
        url: '/demo-gifs/pathfinder-demo.gif', // Placeholder path  
        alt: 'Juneau Pathfinder Demo Preview'
      },
      3: {
        url: '/demo-gifs/bird-tracker-demo.gif', // Placeholder path
        alt: 'Bird Strike Tracker Demo Preview'
      }
    };

    const currentGif = gifs[hoveredTile];
    
    return (
      <div className="gif-preview-active">
        <img 
          src={currentGif?.url} 
          alt={currentGif?.alt}
          className="demo-gif"
          onError={(e) => {
            // Fallback to placeholder if GIF doesn't exist
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="gif-placeholder" style={{ display: 'none' }}>
          <p>Demo GIF Preview</p>
          <p>({currentGif?.alt})</p>
        </div>
      </div>
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
        <div className="gif-preview-container">
          {renderGifPreview()}
        </div>
        
        <div className="tiles-container">
          <div className="tile-wrapper">
            <Link 
              to="/portfolio/benefits" 
              className="tile" 
              title="Benefits Enrollment Demo"
              onMouseEnter={() => handleTileHover(1)}
              onMouseLeave={handleTileLeave}
            >
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
              onMouseEnter={() => handleTileHover(2)}
              onMouseLeave={handleTileLeave}
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
              onMouseEnter={() => handleTileHover(3)}
              onMouseLeave={handleTileLeave}
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
