import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.apiUrl}${config.usersRoute}`;

export const login = (
  username: string,
  password: string
): AxiosRequestConfig => ({
  url: `${url}/login`,
  method: "post",
  data: {
    login: username,
    password,
  },
  withCredentials: true,
});

export const logout = (): AxiosRequestConfig => ({
  url: `${url}/logout`,
  method: "post",
});

export const get = (): AxiosRequestConfig => ({
  url: `${url}/get`,
  method: "get",
  withCredentials: true,
});
