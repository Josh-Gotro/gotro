import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome.jsx'
import PlasterCalculator from './pages/Plaster/PlasterCalculator.jsx'
import Glass from './pages/Glass/Glass.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/plaster-calculator" element={<PlasterCalculator />} />
        <Route path="/glass" element={<Glass />} />
        {/* add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
