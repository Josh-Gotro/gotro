import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx'
import MakerSpace from './pages/MakerSpace.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/ms" element={<MakerSpace />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
