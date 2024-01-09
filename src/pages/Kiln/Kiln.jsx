import { useState } from 'react';
import KilnGlass from './KilnGlass';
import KilnCeramic from './KilnCeramic';
import './Kiln.css';

const Kiln = () => {
  const [selectedTab, setSelectedTab] = useState('Glass');

  return (
    <div>
      <div className="button-container">
        <button onClick={() => setSelectedTab('Glass')}>Glass</button>
        <button onClick={() => setSelectedTab('Ceramic')}>Ceramic</button>
      </div>
      {selectedTab === 'Glass' ? <KilnGlass /> : <KilnCeramic />}
    </div>
  );
};

export default Kiln;