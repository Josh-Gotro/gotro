import { useState } from 'react';
import './art.css';

const Art = () => {
  const [text, setText] = useState('');
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleClick = (size) => {
    console.log('Clicked:', size);
    setText(size);
  };

  const handleMouseEnter = (event, size) => {
    console.log('Mouse enter:', size);
    if (event.target !== event.currentTarget) {
      return;
    }

    let tree;
    if (size === 'BLOW') {
      tree = event.currentTarget.parentNode;
    } else if (size === 'BLOW ') {
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
    <div className='art-container'>
      <div className='figure'>
        <div
          className='head'
          onMouseEnter={(event) => handleMouseEnter(event, 'HEAD')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('HEAD')}
        ></div>
      </div>
      <div
        className='circle large-circle'
        onMouseEnter={(event) => handleMouseEnter(event, 'LARGE')}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick('LARGE')}
      ></div>
      <div
        className='circle medium-circle'
        onMouseEnter={(event) => handleMouseEnter(event, 'MEDIUM')}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick('MEDIUM')}
      ></div>
      <div
        className='circle small-circle'
        onMouseEnter={(event) => handleMouseEnter(event, 'SMALL')}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick('SMALL')}
      ></div>
      <div className='gold-band'></div>

      <div className='tree-container'>
        <div
          className='tree'
          onMouseEnter={(event) => handleMouseEnter(event, 'BLOW ')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('BLOW')}
        >
          <div
            className='branch'
            style={{ transform: 'rotate(-60deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(-50deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(-40deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(-30deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(-20deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(-10deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(0deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(10deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(20deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(30deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(40deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(50deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
          <div
            className='branch'
            style={{ transform: 'rotate(60deg)' }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              handleMouseEnter(event, 'BLOW');
            }}
            onMouseLeave={(event) => {
              event.stopPropagation();
              handleMouseLeave(event);
            }}
            onClick={() => handleClick('BLOW')}
          ></div>
        </div>
      </div>
      <div className='text-display'>{text}</div>
    </div>
  );
};

export default Art;
