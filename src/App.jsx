import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Welcome = lazy(() => import('./pages/Welcome/Welcome.jsx'));
const PlasterCalculator = lazy(
  () => import('./pages/Plaster/PlasterCalculator.jsx')
);
// const Glass = lazy(() => import('./pages/Glass/Glass.jsx'));
const Kiln = lazy(() => import('./pages/Kiln/Kiln.jsx'));
const Art = lazy(() => import('./pages/Art/Art.jsx'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Art />} />
          <Route path='/plaster-calculator' element={<PlasterCalculator />} />
          {/* <Route path='/glass' element={<Glass />} /> */}
          <Route path='/kiln' element={<Kiln />} />
          <Route path='/lol' element={<Welcome />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
