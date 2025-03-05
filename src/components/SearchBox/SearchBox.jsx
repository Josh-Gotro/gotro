import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './search-box.css';

const SearchBox = () => {
  const [placeholder, setPlaceholder] = useState('');
  const [input, setInput] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const placeholders = ['gallery', 'plaster', 'kiln'];
    let i = 0;
    const intervalId = setInterval(() => {
      setPlaceholder(placeholders[i]);
      i = (i + 1) % placeholders.length;
    }, 3000); // Change placeholder every 2 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInput(value);
    if (
      value === import.meta.env.VITE_NAME1 ||
      value === import.meta.env.VITE_NAME2
    ) {
      setShowInfo(true);
    } else if (value === 'gallery') {
      navigate('/gallery');
    } else if (value === 'plaster') {
      navigate('/plaster-calculator');
    } else if (value === 'kiln') {
      navigate('kiln');
    } else {
      setShowInfo(false);
    }
  };

  return (
    <div className="center-container">
      <div className="input-container">
        <input
          className="center-input"
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
      {showInfo && (
        <div className="info-container">
          <p className="info-text">
            Door: {import.meta.env.VITE_DOOR}
            <br />
            Wifi: {import.meta.env.VITE_WIFI}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
