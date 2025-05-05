import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.base}/${config.entity}`;

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
