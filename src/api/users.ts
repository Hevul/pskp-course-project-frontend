import config from "../config.json";

const url = `${config.base}/${config.user}`;

export const get = () => ({
  url: `${url}/get`,
  method: "get",
  withCredentials: true,
});
