import config from "../config.json";

const url = `${config.server}/${config.routes.storage}`;

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

export const getFullInfo = (id: string) => ({
  url: `${url}/get-full-info/${id}`,
  method: "get",
  withCredentials: true,
});

export const rename = (id: string, name: string) => ({
  url: `${url}/rename`,
  method: "put",
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
