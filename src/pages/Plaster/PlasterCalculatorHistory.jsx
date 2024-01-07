import { useState } from 'react';
import PropTypes from 'prop-types';

function PlasterCalculatorHistory({ calculations }) {
  const [selectedCalculations, setSelectedCalculations] = useState({});

  const handleCalculationClick = (id) => {
    setSelectedCalculations(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="grid-container">
      <div className="column">
        {calculations && calculations.map((calculation) => (
          <div key={calculation.id}>
            <button onClick={() => handleCalculationClick(calculation.id)}>
              {`${calculation.length}x${calculation.width}x${calculation.height}`}
            </button>
            {selectedCalculations[calculation.id] && (
              <table>
                <thead>
                  <tr>
                    <th>LxWxH, inches</th>
                    <th>Volume (cu in)</th>
                    <th>Water required (oz by weight)</th>
                    <th>Plaster required (lbs & oz)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {calculation.length} x {calculation.width} x {calculation.height}
                    </td>
                    <td>{calculation.volume.toFixed(2)}</td>
                    <td>{calculation.water.toFixed(2)}</td>
                    <td>
                      {`${calculation.plaster_lbs} lbs ${calculation.plaster_oz.toFixed(2)} oz`}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

PlasterCalculatorHistory.propTypes = {
  calculations: PropTypes.arrayOf(PropTypes.object),
};

export default PlasterCalculatorHistory;