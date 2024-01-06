import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlasterCalculatorHistory() {
  const [calculations, setCalculations] = useState([]);
  const [selectedCalculation, setSelectedCalculation] = useState(null);

  useEffect(() => {
    // Fetch calculation data from the backend API
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/plaster-calculations`)
      .then(response => {
        setCalculations(response.data);
      })
      .catch(error => {
        console.error('Error fetching calculation data:', error);
      });
  }, []);

  const handleCalculationClick = (calculation) => {
    setSelectedCalculation(calculation);
  };

  return (
    <div>
      <div className="column">
        {/* Render buttons with calculation dimensions */}
        {calculations.map((calculation) => (
          <button
            key={calculation.id}
            onClick={() => handleCalculationClick(calculation)}
          >
            {`${calculation.length}x${calculation.width}x${calculation.height}`}
          </button>
        ))}
      </div>
      <div className="column">
        {/* Render calculation details in a table */}
        {selectedCalculation && (
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
                  {selectedCalculation.length} x {selectedCalculation.width} x {selectedCalculation.height}
                </td>
                <td>{selectedCalculation.volume.toFixed(2)}</td>
                <td>{selectedCalculation.water.toFixed(2)}</td>
                <td>
                  {`${selectedCalculation.plasterPounds} lbs ${selectedCalculation.plasterOunces.toFixed(2)} oz`}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PlasterCalculatorHistory;
