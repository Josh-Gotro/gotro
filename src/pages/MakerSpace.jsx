import { useState } from 'react';
import './makerspace.css';


const MakerSpace = () => {
  const [input, setInput] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInput(value);
if (value === import.meta.env.VITE_NAME1 || value === import.meta.env.VITE_NAME2) {
  setShowInfo(true);
} else {
  setShowInfo(false);
}
  };

return (
  <div className="center-container">
    <div className="input-container">
      <input className="center-input" value={input} onChange={handleChange} />
    </div>
    {showInfo &&
      <div className="info-container">
      <p className="info-text">Door: {import.meta.env.VITE_DOOR}<br />Wifi: {import.meta.env.VITE_WIFI}</p>
    </div>
    }
  </div>
);
  }

export default MakerSpace;


