import { useState, useEffect } from 'react';
import axios from 'axios';

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

export function useFetchPlasterCalculations() {
  const [plasterCalculations, setPlasterCalculations] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

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

const createNewRecord = async (length, width, height) => {
  const calcResults = calculatePlasterAndWater(
    Number(length),
    Number(width),
    Number(height)
  );
  try {
    // Persist the calculation to the backend
    const response = await axios.post(`${backendApiUrl}/plaster-calculation`, {
      length: Number(length),
      width: Number(width),
      height: Number(height),
      volume: calcResults.volume,
      water: calcResults.water,
      plaster_lbs: calcResults.plasterPounds,
      plaster_oz: calcResults.plasterOunces,
    });
    console.log('Calculation saved:', response.data);
    // After the new record is created, increment refreshKey
    setRefreshKey(oldKey => oldKey + 1);
  } catch (error) {
    console.error('Error saving calculation:', error);
  }
  return calcResults;
};

  useEffect(() => {
    const fetchPlasterCalculations = async () => {
      try {
        const response = await axios.get(
          `${backendApiUrl}/plaster-calculations`
        );
        const parsedCalculations = response.data.map((calculation) => ({
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
        setPlasterCalculations(recentCalculations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlasterCalculations();
  }, [refreshKey]);

  return { plasterCalculations, createNewRecord };
}