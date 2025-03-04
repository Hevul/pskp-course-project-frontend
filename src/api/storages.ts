import config from "../config.json";

const url = `${config.base}/${config.storage}`;

export const create = (name: string) => ({
  url: `${url}/create`,
  method: "post",
  data: {
    name,
  },
  withCredentials: true,
});

export const getAll = () => ({
  url: `${url}/get-all`,
  method: "get",
  withCredentials: true,
});
