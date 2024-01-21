import { useState } from 'react';
import KilnGlass from './KilnGlass';
import KilnCeramic from './KilnCeramic';
import KilnGlassHistory from './KilnGlassHistory';
import KilnCeramicHistory from './KilnCeramicHistory';
import './kiln.css';

const Kiln = () => {
  const [selectedTab, setSelectedTab] = useState('Glass');

  return (
    <div>
      <div className="button-container">
        <button onClick={() => setSelectedTab('Glass')}>Glass</button>
        <button onClick={() => setSelectedTab('Ceramic')}>Ceramic</button>
      </div>
      {selectedTab === 'Glass' ? <KilnGlass /> : <KilnCeramic />}
            {selectedTab === 'Glass' ? <KilnGlassHistory /> : <KilnCeramicHistory />}

    </div>
  );
};

export default Kiln;