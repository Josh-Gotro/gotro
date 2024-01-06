import { useState, useEffect } from 'react';
import axios from 'axios';

// ... other imports and code ...

function PlasterCalculatorHistory() {
  const [calculations, setCalculations] = useState([]);
  const [selectedCalculation, setSelectedCalculation] = useState(null);

  useEffect(() => {
    // Fetch calculation data from the backend API
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/plaster-calculations`)
      .then(response => {
        console.log(response.data);
        // Parse numeric properties from strings to numbers
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
        setCalculations(parsedCalculations);
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
                  {`${selectedCalculation.plaster_lbs} lbs ${selectedCalculation.plaster_oz.toFixed(2)} oz`}
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
