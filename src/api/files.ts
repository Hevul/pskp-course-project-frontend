import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.base}/${config.file}`;

export const getAllByStorageId = (id: string) => ({
  url: `${url}/get-all-by-storage/${id}`,
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
