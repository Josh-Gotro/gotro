import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome.jsx';
import PlasterCalculator from './pages/Plaster/PlasterCalculator.jsx';
import Glass from './pages/Glass/Glass.jsx';
import Kiln from './pages/Kiln/Kiln.jsx';
import Art from './pages/Art/Art.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Art />} />
        <Route path='/plaster-calculator' element={<PlasterCalculator />} />
        <Route path='/glass' element={<Glass />} />
        <Route path='/kiln' element={<Kiln />} />
        <Route path='/lol' element={<Welcome />} />

        {/* add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
