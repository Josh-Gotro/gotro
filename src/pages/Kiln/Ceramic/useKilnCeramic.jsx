import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendApiUrl } from '../../../api/useApi';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCeramicFirings = async () => {
      try {
        const response = await axios.get(`${backendApiUrl}/ceramic-firings`);
        const sortedData = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setCeramicFirings(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCeramicFirings();
  }, []);

  return { ceramicFirings, setCeramicFirings, isLoading }; // Return isLoading
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
