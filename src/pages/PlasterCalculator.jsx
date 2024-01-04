import { useState } from 'react';
import './plaster.css';

const PlasterCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState(null);

const calculatePlasterAndWater = (length, width, height) => {
    const volume = length * width * height; // Volume of the object in cubic inches
    const volumeWithExtra = volume * 1.075; // Add 7.5% more volume to allow for spills, leaks, etc.
    const quartsWater = volumeWithExtra / 80; // Amount of water needed in quarts
    const plasterWeightInPounds = quartsWater * 2.85; // Weight of plaster needed in pounds

    // Convert plaster weight to whole pounds and ounces
    const plasterPounds = Math.floor(plasterWeightInPounds);
    const plasterOunces = (plasterWeightInPounds - plasterPounds) * 16; // Convert fractional pounds to ounces

    return {
        volume: volumeWithExtra,
        water: quartsWater * 32, // Convert quarts of water to ounces
        plasterPounds,
        plasterOunces
    };
};

  const handleSubmit = () => {
    const calcResults = calculatePlasterAndWater(Number(length), Number(width), Number(height));
    setResults(calcResults);
  };

  return (
    <div>
      <h2>Plaster Calculator</h2>
      <div className="input-group">
      <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder="Length (inches)" />
      <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="Width (inches)" />
      <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (inches)" />
      <button onClick={handleSubmit}>Calculate</button>
      </div>


      {results && (
        <table>
          <thead>
              <tr>
                  <th>LxWxH, inches</th>
                  <th>Volume (cu in)</th>
                  <th>Water required (oz)</th>
                  <th>Plaster  required(lbs & oz)</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>{length} x {width} x {height}</td>
                  <td>{results.volume.toFixed(2)}</td>
                  <td>{results.water.toFixed(2)}</td>
                  <td>{results.plasterPounds} lbs {results.plasterOunces.toFixed(2)} oz</td>
              </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlasterCalculator;
