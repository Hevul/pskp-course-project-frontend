import config from "../config.json";

const url = `${config.base}/${config.auth}`;

export const login = (username: string, password: string) => ({
  url: `${url}/login`,
  method: "post",
  data: {
    login: username,
    password,
  },
  withCredentials: true,
});

export const logout = () => ({
  url: `${url}/logout`,
  method: "post",
  withCredentials: true,
});

export const checkAuth = () => ({
  url: `${url}/check-auth`,
  method: "get",
  withCredentials: true,
});
