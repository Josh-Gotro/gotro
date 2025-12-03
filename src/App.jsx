import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Welcome = lazy(() => import('./pages/Welcome/Welcome.jsx'));
const PlasterCalculator = lazy(
  () => import('./pages/Plaster/PlasterCalculator.jsx')
);
const Kiln = lazy(() => import('./pages/Kiln/Kiln.jsx'));
const Art = lazy(() => import('./pages/Art/Art.jsx'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio.jsx'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery.jsx'));
const Benefits = lazy(
  () => import('./pages/Portfolio/Projects/Benefits/index.jsx')
);
const Spotify = lazy(() => import('./pages/Spotify/Spotify.jsx'));
const SpotifyCallback = lazy(
  () => import('./pages/Spotify/SpotifyCallback.jsx')
);

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Art />} />
          <Route path="/plaster-calculator" element={<PlasterCalculator />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/kiln" element={<Kiln />} />
          <Route path="/lol" element={<Welcome />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/benefits/*" element={<Benefits />} />
          <Route path="/spotify" element={<Spotify />} />
          <Route path="/spotify/callback" element={<SpotifyCallback />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
