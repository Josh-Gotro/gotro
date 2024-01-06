import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome.jsx'
import MakerSpace from './components/MakerSpace/MakerSpace.jsx'
import PlasterCalculator from './pages/Plaster/PlasterCalculator.jsx'
import Glass from './pages/Glass/Glass.jsx'
import PlasterCalculatorHistory from './pages/Plaster/PlasterCalculatorHistory.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/ms" element={<MakerSpace />} />
        <Route path="/plaster-calculator" element={<PlasterCalculator />} />
        <Route path="/plaster-calculator/history" element={<PlasterCalculatorHistory />} />
        <Route path="/glass" element={<Glass />} />
        {/* add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
