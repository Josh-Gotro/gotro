import { useState, useEffect } from 'react';
import './plaster.css';
import plasterCalcImage from '../../assets/plaster-calc-function.png';
import PlasterCalculatorHistory from './PlasterCalculatorHistory.jsx';
import axios from 'axios';


const PlasterCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState(null);
  const [showFormula, setShowFormula] = useState(false);
  const [showCommonRatios, setShowCommonRatios] = useState(false);
  const [showTiming, setShowTiming] = useState(false);

  const handleFormulaToggle = () => {
    setShowFormula(!showFormula);
  };

  const handleCommonRatiosToggle = () => {
    setShowCommonRatios(!showCommonRatios);
  };

  const handleTimingToggle = () => {
    setShowTiming(!showTiming);
  };

  const calculatePlasterAndWater = (length, width, height) => {
    const volume = length * width * height; // Volume of the mould in cubic inches
    const volumeWithExtra = volume * 1.075; // Add 7.5% more volume to allow for spills, leaks, etc.
    const quartsWater = volumeWithExtra / 80; // Amount of water needed in quarts
    const plasterWeightInPounds = quartsWater * 2.85; // Weight of plaster needed in pounds

    // Convert plaster weight to whole pounds and ounces
    const plasterPounds = Math.floor(plasterWeightInPounds);
    const plasterOunces = (plasterWeightInPounds - plasterPounds) * 16; // Convert fractional pounds to ounces

    return {
      volume: volumeWithExtra,
      water: quartsWater * 32 * 1.043 , // Convert quarts of water to ounces, then from volume to weight. 1.043 is the weight of 1 oz of water at 70 degrees F
      plasterPounds,
      plasterOunces,
    };
  };

  useEffect(() => {
  fetchCalculations();
}, []);

const [calculations, setCalculations] = useState([]);


const fetchCalculations = () => {
  axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/plaster-calculations`)
    .then(response => {
      const parsedCalculations = response.data.map(calculation => ({
        ...calculation,
        length: parseFloat(calculation.length),
        width: parseFloat(calculation.width),
        height: parseFloat(calculation.height),
        volume: parseFloat(calculation.volume),
        water: parseFloat(calculation.water),
        plaster_lbs: parseFloat(calculation.plaster_lbs),
        plaster_oz: parseFloat(calculation.plaster_oz),
      }));
      // Get the last 6 calculations
      const recentCalculations = parsedCalculations.slice(-6);

      setCalculations(recentCalculations);
    })
    .catch(error => {
      console.error('Error fetching calculation data:', error);
    });
};

const handleSubmit = () => {
  const calcResults = calculatePlasterAndWater(
    Number(length),
    Number(width),
    Number(height)
  );
  setResults(calcResults);

  // Persist the calculation to the backend
  axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/plaster-calculation`, {
    length: Number(length),
    width: Number(width),
    height: Number(height),
    volume: calcResults.volume,
    water: calcResults.water,
    plaster_lbs: calcResults.plasterPounds,
    plaster_oz: calcResults.plasterOunces,
  })
  .then(response => {
    fetchCalculations();
    console.log('Calculation saved:', response.data);
  })
  .catch(error => {
    console.error('Error saving calculation:', error);
  });
};

  return (
    <div>
      <h2>Plaster Calculator</h2>
      <div className="input-group">
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Length (in)"
        />
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Width (in)"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height (in)"
        />
        <button onClick={handleSubmit}>Calculate</button>
      </div>

      {results && (
        <table>
          <thead>
            <tr>
              <th>LxWxH, inches</th>
              <th>Volume <br/>(cu in)</th>
              <th>Water required <br/>(oz by weight)</th>
              <th>Plaster required<br/>(lbs & oz)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {length} x {width} x {height}
              </td>
              <td>{results.volume.toFixed(2)}</td>
              <td>{results.water.toFixed(2)}</td>
              <td>
                {results.plasterPounds} lbs {results.plasterOunces.toFixed(2)}{' '}
                oz
              </td>
            </tr>
          </tbody>
        </table>
      )}



      <div className="show-more-info-section">
        <span style={{ color: 'gold' }} onClick={handleTimingToggle}>
          {showTiming ? 'hide timing' : 'see timing'}
        </span>
        {showTiming && (
          <>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Add plaster</th>
                  <th>Soak</th>
                  <th>Mix</th>
                  <th>Liquid</th>
                  <th>Thix- <br/>  otropic</th>
                  <th>Plastic</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>min</td>
                  <td>1 </td>
                  <td>3</td>
                  <td>3</td>
                  <td>3</td>
                  <td>2</td>
                  <td>3</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>min <br/> elapsed</td>
                  <td>1 </td>
                  <td>4</td>
                  <td>7</td>
                  <td>10</td>
                  <td>12</td>
                  <td>15</td>
                  <td>15</td>
                </tr>
              </tbody>
            </table>
</div>
            <table>
              <thead>
                <tr>
                  <th>Plaster State</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Liquid plaster</td>
                  <td>Flows like heavy cream</td>
                </tr>
                <tr>
                  <td>Thixotropic plaster</td>
                  <td>Stands on its own but returns to liquid when shaken</td>
                </tr>
                <tr>
                  <td>Plastic plaster</td>
                  <td>Has the ability to be modeled like clay</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        <span style={{ color: 'gold' }} onClick={handleCommonRatiosToggle}>
          {showCommonRatios
            ? 'hide common mix ratios'
            : 'see common mix ratios'}
        </span>
        {showCommonRatios && (
          <table>
            <thead>
              <tr>
                <th>WATER (quarts)</th>
                <th>PLASTER Wt. (70)</th>
                <th>PLASTER Wt. (66)</th>
                <th>VOLUME CREATED (cu. in.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0.5</td>
                <td>1.40</td>
                <td>1.5</td>
                <td>40</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2.85</td>
                <td>3</td>
                <td>80</td>
              </tr>
              <tr>
                <td>2</td>
                <td>5.70</td>
                <td>6</td>
                <td>160</td>
              </tr>
              <tr>
                <td>3</td>
                <td>8.55</td>
                <td>9</td>
                <td>240</td>
              </tr>
              <tr>
                <td>4</td>
                <td>11.40</td>
                <td>12</td>
                <td>320</td>
              </tr>
              <tr>
                <td>5</td>
                <td>14.25</td>
                <td>15</td>
                <td>400</td>
              </tr>
              <tr>
                <td>6</td>
                <td>17.10</td>
                <td>18</td>
                <td>480</td>
              </tr>
              <tr>
                <td>7</td>
                <td>19.95</td>
                <td>21</td>
                <td>560</td>
              </tr>
              <tr>
                <td>8</td>
                <td>22.80</td>
                <td>24</td>
                <td>640</td>
              </tr>
              <tr>
                <td>9</td>
                <td>25.65</td>
                <td>27</td>
                <td>720</td>
              </tr>
              <tr>
                <td>10</td>
                <td>28.50</td>
                <td>30</td>
                <td>800</td>
              </tr>
            </tbody>
          </table>
        )}
        <span style={{ color: 'gold' }} onClick={handleFormulaToggle}>
          {showFormula ? 'hide formula' : 'see formula used to calculate'}
        </span>
        {showFormula && (
          <img style={{ width: '90%', height: 'auto' }} src={plasterCalcImage} alt="plaster calc function" />        )}

      </div>
      <div className="history-container">
        <h2>Previously viewed forms</h2>
<PlasterCalculatorHistory calculations={calculations} />
</div>
    </div>

  );
};

export default PlasterCalculator;
