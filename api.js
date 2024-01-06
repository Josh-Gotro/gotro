import axios from 'axios';

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function fetchPlasterCalculations() {
  const response = await axios.get(`${backendApiUrl}/plaster-calculations`);
  return response.data;
}
