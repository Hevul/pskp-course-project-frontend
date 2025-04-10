import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.base}/${config.file}`;

export const get = (id: string) => ({
  url: `${url}/${id}`,
  method: "get",
  withCredentials: true,
});

export const getFilesByStorageId = (storageId: string, parentId?: string) => ({
  url: `${url}/get-all-by-storage/${storageId}${
    parentId ? `/${parentId}` : ""
  }`,
  method: "get",
  withCredentials: true,
});

export const upload = (
  file: File,
  storageId: string,
  parentId?: string,
  options: {
    isLarge?: boolean;
    onUploadProgress?: (progress: number) => void;
    cancelToken?: any;
  } = {}
): AxiosRequestConfig => {
  const { isLarge = false, onUploadProgress, cancelToken } = options;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", file.name);
  formData.append("storageId", storageId);
  formData.append("parentId", parentId || "");

  const baseConfig: AxiosRequestConfig = {
    url: `${url}/${isLarge ? "upload-large" : "upload"}`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    cancelToken,
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const total = progressEvent.total ?? 1;
        const loaded = progressEvent.loaded;
        const percent = Math.round((loaded / total) * 100);
        onUploadProgress(percent);
      }
    },
  };

  const largeFileConfig: AxiosRequestConfig = {
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 0,
  };

  return isLarge ? { ...baseConfig, ...largeFileConfig } : baseConfig;
};

export const overwrite = (
  file: File,
  id: string,
  options: {
    isLarge?: boolean;
    onUploadProgress?: (progress: number) => void;
    cancelToken?: any;
  } = {}
): AxiosRequestConfig => {
  const { isLarge = false, onUploadProgress, cancelToken } = options;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", id);

  const baseConfig: AxiosRequestConfig = {
    url: `${url}/${isLarge ? "overwrite-large" : "overwrite"}`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    cancelToken,
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const total = progressEvent.total ?? 1;
        const loaded = progressEvent.loaded;
        const percent = Math.round((loaded / total) * 100);
        onUploadProgress(percent);
      }
    },
  };

  const largeFileConfig: AxiosRequestConfig = {
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 0,
  };

  return isLarge ? { ...baseConfig, ...largeFileConfig } : baseConfig;
};

export const remove = (id: string): AxiosRequestConfig => ({
  url: `${url}/delete`,
  method: "delete",
  data: {
    id,
  },
  withCredentials: true,
});

export const download = (id: string): AxiosRequestConfig => ({
  url: `${url}/download/${id}`,
  method: "get",
  withCredentials: true,
  responseType: "blob",
});

export const rename = (id: string, name: string): AxiosRequestConfig => ({
  url: `${url}/rename`,
  method: "patch",
  data: {
    id,
    name,
  },
  withCredentials: true,
});

export const copy = (id: string, parentId?: string): AxiosRequestConfig => ({
  url: `${url}/copy`,
  method: "post",
  data: {
    id,
    parentId,
  },
  withCredentials: true,
});

export const move = (id: string, parentId?: string): AxiosRequestConfig => ({
  url: `${url}/move`,
  method: "put",
  data: {
    id,
    parentId,
  },
  withCredentials: true,
});
