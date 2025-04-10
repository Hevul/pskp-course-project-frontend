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

export const rename = (id: string, name: string) => ({
  url: `${url}/rename`,
  method: "patch",
  data: {
    id,
    name,
  },
  withCredentials: true,
});

export const remove = (id: string, force = true) => ({
  url: `${url}/delete`,
  method: "delete",
  data: {
    id,
    force,
  },
  withCredentials: true,
});
