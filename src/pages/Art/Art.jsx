import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './art.css';
import Tree from './Tree';

// import SearchBox from '../../components/SearchBox/SearchBox';

const Art = () => {
  const [text, setText] = useState('');
  const [hoveredElement, setHoveredElement] = useState(null);
  const navigate = useNavigate();

  const handleClick = (size) => {
    console.log('Clicked:', size);
    switch (size) {
      case 'GALLERY':
        setText(size);
        navigate('/gallery');
        break;
      case 'PORTFOLIO':
        setText(size);
        navigate('/portfolio');
        break;
      case 'PLASTER CALC':
        setText(size);
        navigate('/plaster-calculator');
        break;
      case 'KILN':
        setText(size);
        navigate('/kiln');
        break;
      case 'SMALL':
        setText(size);
        // TODO: add small page
        navigate('/portfolio');
        break;
      default:
        setText('');
    }
  };

  const handleMouseEnter = (event, size) => {
    console.log('Mouse enter:', size);
    if (event.target !== event.currentTarget) {
      return;
    }

    let tree;
    if (size === 'PORTFOLIO') {
      tree = event.currentTarget.parentNode;
    } else if (size === 'PORTFOLIO ') {
      tree = event.currentTarget;
    }

    if (tree) {
      const branches = tree.getElementsByClassName('branch');
      for (let i = 0; i < branches.length; i++) {
        branches[i].style.backgroundColor = 'pink';
      }
      tree.style.backgroundColor = 'pink';
      setHoveredElement(tree);
    }
    setText(size);
  };

  const handleMouseLeave = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (hoveredElement) {
      const branches = hoveredElement.getElementsByClassName('branch');
      for (let i = 0; i < branches.length; i++) {
        branches[i].style.backgroundColor = '';
      }
      hoveredElement.style.backgroundColor = '';
      setHoveredElement(null);
    }
    setText('');
  };

  return (
    <div className="art-container">
      <div className="figure">
        <div
          className="head moon-face"
          onMouseEnter={(event) => handleMouseEnter(event, 'GALLERY')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('GALLERY')}
        ></div>
        {/* <div className="search-input"><SearchBox /></div> */}
        <Tree
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('PORTFOLIO')}
        />
      </div>

      <div
        className="circle large-circle"
        onMouseEnter={(event) => handleMouseEnter(event, 'PLASTER CALC')}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick('PLASTER CALC')}
      ></div>
      <div
        className="circle medium-circle"
        onMouseEnter={(event) => handleMouseEnter(event, 'KILN')}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick('KILN')}
      ></div>
      <div
        className="circle small-circle"
        onMouseEnter={(event) => handleMouseEnter(event, 'SMALL')}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick('SMALL')}
      ></div>
      <div className="gold-band"></div>
      <div className="text-display">{text}</div>
    </div>
  );
};

export default Art;
