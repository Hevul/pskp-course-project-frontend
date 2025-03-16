import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const useAxios = (config?: AxiosRequestConfig, autoExecute = false) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const axiosInstance = axios.create();

  const sendRequest = async (requestConfig?: AxiosRequestConfig) => {
    const controller = new AbortController();
    setAbortController(controller);

    setLoading(true);
    setError(null);

    try {
      const result = await axiosInstance({
        ...(config || {}),
        ...(requestConfig || {}),
        signal: controller.signal,
      });
      setResponse(result);

      return response;
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err as AxiosError);
        throw err;
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  const abortRequest = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  useEffect(() => {
    if (autoExecute && config) {
      sendRequest(config);
    }
  }, [autoExecute, config]);

  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  return { response, error, loading, sendRequest, abortRequest };
};

export default useAxios;
