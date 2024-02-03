import { useState } from 'react';
import { useFetchCeramicFirings } from '../../../useApi.js';
import KilnGlass from './KilnGlass';
import KilnCeramic from './KilnCeramic';
import KilnGlassHistory from './KilnGlassHistory';
import KilnCeramicHistory from './KilnCeramicHistory';
import './kiln.css';

const Kiln = () => {
  const [selectedTab, setSelectedTab] = useState('Glass');
  const { ceramicFirings, setCeramicFirings, isLoading } =
    useFetchCeramicFirings();

  return (
    <div className='kiln-wrapper'>
      <div className='button-container'>
        <button onClick={() => setSelectedTab('Glass')}>Glass</button>
        <button onClick={() => setSelectedTab('Ceramic')}>Ceramic</button>
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
          <KilnGlassHistory />
        ) : (
          !isLoading && <KilnCeramicHistory ceramicFirings={ceramicFirings} />
        )}
      </div>
    </div>
  );
};

export default Kiln;
