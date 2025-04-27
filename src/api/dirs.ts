import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.base}/${config.dir}`;

export const download = (id: string): AxiosRequestConfig => ({
  url: `${url}/download/${id}`,
  method: "post",
  withCredentials: true,
  responseType: "blob",
});

export const create = (
  name: string,
  storageId: string,
  parentId?: string
): AxiosRequestConfig => ({
  url: `${url}/create`,
  method: "post",
  data: {
    name,
    storageId,
    parentId,
  },
  withCredentials: true,
});

export const getFullInfo = (id: string) => ({
  url: `${url}/get-full-info/${id}`,
  method: "get",
  withCredentials: true,
});

export const remove = (id: string): AxiosRequestConfig => ({
  url: `${url}/delete`,
  method: "delete",
  data: {
    id,
  },
  withCredentials: true,
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

export const getDirsByStorageId = (
  storageId: string,
  parentId?: string
): AxiosRequestConfig => ({
  url: `${url}/get-all-by-storage/${storageId}${
    parentId ? `/${parentId}` : ""
  }`,
  method: "get",
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
