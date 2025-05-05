import config from "../config.json";

const url = `${config.base}/${config.user}`;

export const get = () => ({
  url: `${url}/get`,
  method: "get",
  withCredentials: true,
});

export const getByIds = (ids: string[]) => ({
  url: `${url}/get-by-ids`,
  method: "post",
  data: {
    ids,
  },
  withCredentials: true,
});

export const register = (username: string, password: string) => ({
  url: `${url}/register`,
  method: "post",
  data: {
    login: username,
    password,
  },
});
