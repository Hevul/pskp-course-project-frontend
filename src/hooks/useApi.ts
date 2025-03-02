import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useApi = (config: AxiosRequestConfig<any>, autoFetch = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (config: AxiosRequestConfig<any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(config);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) sendRequest(config);
  }, [autoFetch]);

  return { data, loading, error, sendRequest };
};

export default useApi;
