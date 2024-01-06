import { useState, useEffect } from 'react';
import axios from 'axios';

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

export function useFetchPlasterCalculations() {
  const [plasterCalculations, setPlasterCalculations] = useState([]);

  useEffect(() => {
    const fetchPlasterCalculations = async () => {
      try {
        const response = await axios.get(
          `${backendApiUrl}/plaster-calculations`
        );
        setPlasterCalculations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlasterCalculations();
  }, []);

  return plasterCalculations;
}
