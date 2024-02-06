import { useState } from 'react';
import { useFetchCeramicFirings } from '../../api/ceramicApi.js';
import KilnGlass from './KilnGlass';
import KilnCeramic from './KilnCeramic';
import KilnGlassHistory from './KilnGlassHistory';
import KilnCeramicHistory from './KilnCeramicHistory';
import './kiln.css';

const Kiln = () => {
  const [selectedTab, setSelectedTab] = useState('Ceramic');
  const { ceramicFirings, setCeramicFirings, isLoading } =
    useFetchCeramicFirings();

  return (
    <div className='kiln-wrapper'>
      <div className='button-container'>
        <button
          className={`glass-button ${selectedTab === 'Glass' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Glass')}
        >
          Glass
        </button>
        <button
          className={`ceramic-button ${selectedTab === 'Ceramic' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Ceramic')}
        >
          Ceramic
        </button>
      </div>
      <div className='kiln-component'>
        {selectedTab === 'Glass' ? (
          <KilnGlass />
        ) : (
          <KilnCeramic setCeramicFirings={setCeramicFirings} />
        )}
      </div>
      <div className='kiln-history-component'>
        {selectedTab === 'Glass' ? (
          <KilnGlassHistory ceramicFirings={ceramicFirings} />
        ) : (
          !isLoading && <KilnCeramicHistory ceramicFirings={ceramicFirings} />
        )}
      </div>
    </div>
  );
};

export default Kiln;
