import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.server}/${config.routes.link}`;

export const get = (id: string): AxiosRequestConfig => ({
  url: `${url}/get/${id}`,
  method: "get",
  withCredentials: true,
});

export const getFullInfo = (id: string): AxiosRequestConfig => ({
  url: `${url}/get-full-info/${id}`,
  method: "get",
  withCredentials: true,
});

export const getAllByOwner = (): AxiosRequestConfig => ({
  url: `${url}/get-all-by-owner`,
  method: "get",
  withCredentials: true,
});

export const getByLink = (link: string): AxiosRequestConfig => ({
  url: `${url}/get-by-link/${link}`,
  method: "get",
  withCredentials: true,
});

export const getByFileInfoId = (id: string): AxiosRequestConfig => ({
  url: `${url}/get-by-fileinfo-id/${id}`,
  method: "get",
  withCredentials: true,
});

export const create = (id: string): AxiosRequestConfig => ({
  url: `${url}/create`,
  method: "post",
  data: {
    id,
  },
  withCredentials: true,
});

export const download = (link: string): AxiosRequestConfig => ({
  url: `${url}/download/${link}`,
  method: "get",
  withCredentials: true,
  responseType: "blob",
});

export const addFriend = (
  id: string,
  friendName: string
): AxiosRequestConfig => ({
  url: `${url}/add-friend`,
  method: "put",
  data: {
    id,
    friendName,
  },
  withCredentials: true,
});

export const removeFriend = (
  id: string,
  friendId: string
): AxiosRequestConfig => ({
  url: `${url}/remove-friend`,
  method: "put",
  data: {
    id,
    friendId,
  },
  withCredentials: true,
});

export const removeAllFriends = (id: string): AxiosRequestConfig => ({
  url: `${url}/remove-all-friends/${id}`,
  method: "put",
  withCredentials: true,
});

export const remove = (id: string): AxiosRequestConfig => ({
  url: `${url}/delete`,
  method: "delete",
  data: {
    id,
  },
  withCredentials: true,
});

export const setPublicity = (
  id: string,
  publicity: boolean
): AxiosRequestConfig => ({
  url: `${url}/set-publicity`,
  method: "put",
  data: {
    id,
    publicity,
  },
  withCredentials: true,
});

export const updateNameAndDescription = (
  id: string,
  name: string,
  description: string
): AxiosRequestConfig => ({
  url: `${url}/update-name-and-description`,
  method: "put",
  data: {
    id,
    name,
    description,
  },
  withCredentials: true,
});
