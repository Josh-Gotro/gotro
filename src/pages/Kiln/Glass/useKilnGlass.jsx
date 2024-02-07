import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendApiUrl } from '../../../api/useApi';

// #region [ Blue ]  PRO_TABLE
// GET all records from pro_table
export function useFetchAllProTableRecords() {
  const [proTableRecords, setProTableRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProTableRecords = async () => {
      try {
        const response = await axios.get(`${backendApiUrl}/pro-table`);
        setProTableRecords(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProTableRecords();
  }, []);

  return { proTableRecords, isLoading };
}

// GET a single record from pro_table by id
export function useFetchProTableRecordById(id) {
  const [proTableRecord, setProTableRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProTableRecordById = async () => {
      try {
        const response = await axios.get(`${backendApiUrl}/pro-table/${id}`);
        setProTableRecord(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProTableRecordById();
  }, [id]);

  return { proTableRecord, isLoading };
}

// POST a new record to pro_table
export function usePostProTableRecord() {
  const postProTableRecord = async (data) => {
    try {
      const response = await axios.post(`${backendApiUrl}/pro-table`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { postProTableRecord };
}

// PUT (update) a record in pro_table by id
export function usePutProTableRecord(id) {
  const putProTableRecord = async (data) => {
    try {
      const response = await axios.put(
        `${backendApiUrl}/pro-table/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { putProTableRecord };
}

// DELETE a record from pro_table by id
export function useDeleteProTableRecord(id) {
  const deleteProTableRecord = async () => {
    try {
      const response = await axios.delete(`${backendApiUrl}/pro-table/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteProTableRecord };
}
// #endregion
// #region [ Grey ]  PRO_TABLE
// GET all records from kiln_glass_records
export function useFetchAllKilnGlassRecords() {
  const [kilnGlassRecords, setKilnGlassRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllKilnGlassRecords = async () => {
      try {
        const response = await axios.get(`${backendApiUrl}/kiln-glass-records`);
        setKilnGlassRecords(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllKilnGlassRecords();
  }, []);

  return { kilnGlassRecords, isLoading };
}

// GET a single record from kiln_glass_records by id
export function useFetchKilnGlassRecordById(id) {
  const [kilnGlassRecord, setKilnGlassRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKilnGlassRecordById = async () => {
      try {
        const response = await axios.get(
          `${backendApiUrl}/kiln-glass-records/${id}`
        );
        setKilnGlassRecord(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKilnGlassRecordById();
  }, [id]);

  return { kilnGlassRecord, isLoading };
}

// POST a new record to kiln_glass_records
export function usePostKilnGlassRecord() {
  const postKilnGlassRecord = async (data) => {
    try {
      const response = await axios.post(
        `${backendApiUrl}/kiln-glass-records`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { postKilnGlassRecord };
}

// PUT (update) a record in kiln_glass_records by id
export function usePutKilnGlassRecord(id) {
  const putKilnGlassRecord = async (data) => {
    try {
      const response = await axios.put(
        `${backendApiUrl}/kiln-glass-records/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { putKilnGlassRecord };
}

// DELETE a record from kiln_glass_records by id
export function useDeleteKilnGlassRecord(id) {
  const deleteKilnGlassRecord = async () => {
    try {
      const response = await axios.delete(
        `${backendApiUrl}/kiln-glass-records/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteKilnGlassRecord };
}
// #endregion
