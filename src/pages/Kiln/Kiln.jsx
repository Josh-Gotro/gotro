import { useState, Suspense, lazy } from 'react';
import { useFetchCeramicFirings } from './Ceramic/useKilnCeramic.jsx';
import {
  useFetchAllKilnGlassRecords,
  useFetchAllProTableRecords,
} from './Glass/useKilnGlass.jsx';
import './kiln.css';
import loadingImage from '../../assets/lion.webp';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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

  const { kilnGlassRecords, setKilnGlassRecord, glassRecordsLoading } =
    useFetchAllKilnGlassRecords();
  const [proTableRecords, proTablesLoading] = useFetchAllProTableRecords();

  return (
    <div className="kiln-wrapper">
      <div className="button-container">
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
          <div className="loader">
            <img src={loadingImage} alt="Loading..." />
          </div>
        }
      >
        <div className="kiln-component">
          {selectedTab === 'Glass' ? (
            proTablesLoading || glassRecordsLoading ? (
              <div>Loading...</div>
            ) : (
              <KilnGlass
                setKilnGlassRecord={setKilnGlassRecord}
                proTableRecords={proTableRecords}
              />
            )
          ) : (
            <KilnCeramic setCeramicFirings={setCeramicFirings} />
          )}
        </div>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader">
            <img src={loadingImage} alt="Loading..." />
          </div>
        }
      >
        <div className="kiln-history-component">
          {selectedTab === 'Glass'
            ? !glassRecordsLoading && (
                <KilnGlassHistory kilnGlassRecords={kilnGlassRecords} />
              )
            : !isLoading && (
                <KilnCeramicHistory ceramicFirings={ceramicFirings} />
              )}
        </div>
      </Suspense>
      <Link to="/" className="home-icon">
        <AiOutlineHome size={24} />
      </Link>
    </div>
  );
};

export default Kiln;
