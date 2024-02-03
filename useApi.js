import { useState, useEffect } from 'react';
import axios from 'axios';

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

export function useFetchCurrentCeramicFiring() {
  const [currentCeramicFiring, setCurrentCeramicFiring] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentCeramicFiring = async () => {
      try {
        const response = await axios.get(
          `${backendApiUrl}/current-ceramic-firing`
        );
        setCurrentCeramicFiring(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentCeramicFiring();
  }, []);

  return [currentCeramicFiring, isLoading];
}

export function useFetchCeramicFirings() {
  const [ceramicFirings, setCeramicFirings] = useState([]);

  useEffect(() => {
    const fetchCeramicFirings = async () => {
      try {
        const response = await axios.get(`${backendApiUrl}/ceramic-firings`);
        setCeramicFirings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCeramicFirings();
  }, []);

  return ceramicFirings;
}

export function usePostCeramicFiring() {
  const postCeramicFiring = async (data) => {
    try {
      const response = await axios.post(
        `${backendApiUrl}/ceramic-firings`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return postCeramicFiring;
}
