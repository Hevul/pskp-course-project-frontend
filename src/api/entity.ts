import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.server}/${config.routes.entity}`;

export const moveMultiple = (options: {
  fileIds: string[];
  dirIds: string[];
  destinationId?: string;
  overwrite?: boolean;
}): AxiosRequestConfig => ({
  url: `${url}/move-multiple`,
  method: "put",
  data: {
    fileIds: options.fileIds,
    dirIds: options.dirIds,
    destinationId: options.destinationId,
    overwrite: options.overwrite,
  },
  withCredentials: true,
});

export const copyMultiple = (options: {
  fileIds: string[];
  dirIds: string[];
  destinationId?: string;
}): AxiosRequestConfig => ({
  url: `${url}/copy-multiple`,
  method: "post",
  data: {
    fileIds: options.fileIds,
    dirIds: options.dirIds,
    destinationId: options.destinationId,
  },
  withCredentials: true,
});
