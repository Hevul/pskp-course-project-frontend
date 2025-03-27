import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.base}/${config.file}`;

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
  parentId?: string
): AxiosRequestConfig => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("storageId", storageId);
  formData.append("parentId", parentId || "");
  formData.append("name", file.name);

  return {
    url: `${url}/upload`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
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
