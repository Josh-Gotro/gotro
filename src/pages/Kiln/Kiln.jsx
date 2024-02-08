import { useState, Suspense, lazy } from 'react';
import { useFetchCeramicFirings } from './Ceramic/useKilnCeramic.jsx';
import { useFetchAllKilnGlassRecords } from './Glass/useKilnGlass.jsx';
import './kiln.css';
import loadingImage from '../../../public/assets/lion.webp';

const KilnGlass = lazy(() => import('./Glass/KilnGlass.jsx'));
const KilnCeramic = lazy(() => import('./Ceramic/KilnCeramic.jsx'));
const KilnGlassHistory = lazy(() => import('./Glass/KilnGlassHistory.jsx'));
const KilnCeramicHistory = lazy(
  () => import('./Ceramic/KilnCeramicHistory.jsx')
);

const Kiln = () => {
  const [selectedTab, setSelectedTab] = useState('Ceramic');
  const { ceramicFirings, setCeramicFirings, isLoading } =
    useFetchCeramicFirings();

  const {kilnGlassRecords, setKilnGlassRecords, glassRecordsLoading } = useFetchAllKilnGlassRecords

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
      <Suspense
        fallback={
          <div className='loader'>
            <img src={loadingImage} alt='Loading...' />
          </div>
        }
      >
        <div className='kiln-component'>
          {selectedTab === 'Glass' ? (
            <KilnGlass setKilnGlassRecords={setKilnGlassRecords} />
          ) : (
            <KilnCeramic setCeramicFirings={setCeramicFirings} />
          )}
        </div>
      </Suspense>
      <Suspense
        fallback={
          <div className='loader'>
            <img src={loadingImage} alt='Loading...' />
          </div>
        }
      >
        <div className='kiln-history-component'>
          {selectedTab === 'Glass' ? (
            !glassRecordsLoading && <KilnGlassHistory kilnGlassRecords={kilnGlassRecords} />
          ) : (
            !isLoading && <KilnCeramicHistory ceramicFirings={ceramicFirings} />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default Kiln;
