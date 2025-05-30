import { useCallback, useEffect, useState } from "react";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  CancelTokenSource,
} from "axios";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../contexts/PopupContext";

interface UseAxiosOptions {
  config?: AxiosRequestConfig;
  autoExecute?: boolean;
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: any) => void;
}

const useAxios = ({
  config,
  autoExecute = false,
  onSuccess,
  onError,
}: UseAxiosOptions = {}) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] =
    useState<CancelTokenSource | null>(null);
  const navigate = useNavigate();
  const { show } = usePopup();

  const axiosInstance = axios.create();

  const cancelRequest = useCallback(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by the user");
      setCancelTokenSource(null);
    }
  }, [cancelTokenSource]);

  const sendRequest = async (requestConfig?: AxiosRequestConfig) => {
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    setLoading(true);
    setError(null);

    try {
      const result = await axiosInstance({
        ...(config || {}),
        ...(requestConfig || {}),
        cancelToken: source.token,
      });

      setResponse(result);
      onSuccess?.(result);

      return result;
    } catch (err) {
      if (!axios.isCancel(err)) {
        const axiosError = err as AxiosError;
        const status = axiosError?.status;

        if (status === 401) {
          show("Необходимо войти в аккаунт!", { iconType: "error" });
          navigate("/login");
        }
        if (status && status >= 500) navigate("/server-side-trouble");

        setError(err);
        onError?.(axiosError);
      }
    } finally {
      setLoading(false);
      setCancelTokenSource(null);
    }
  };

  useEffect(() => {
    if (autoExecute && config) sendRequest(config);
  }, [autoExecute, config, sendRequest]);

  useEffect(() => {
    return () => cancelRequest();
  }, [cancelRequest]);

  return {
    response,
    error,
    loading,
    sendRequest,
    cancelRequest,
    isCanceled: axios.isCancel(error),
  };
};

export default useAxios;
