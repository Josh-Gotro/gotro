import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx'
import MakerSpace from './pages/MakerSpace.jsx'
import PlasterCalculator from './pages/PlasterCalculator.jsx'
import Glass from './pages/Glass.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/ms" element={<MakerSpace />} />
        <Route path="/plaster-calculator" element={<PlasterCalculator />} />
        <Route path="/glass" element={<Glass />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
