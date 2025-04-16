import { AxiosRequestConfig } from "axios";
import config from "../config.json";

const url = `${config.base}/${config.link}`;

export const get = (id: string): AxiosRequestConfig => ({
  url: `${url}/get/${id}`,
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

export const getOrGenerate = (fileId: string): AxiosRequestConfig => ({
  url: `${url}/get-or-generate`,
  method: "post",
  data: {
    fileId,
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
  method: "patch",
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
  method: "patch",
  data: {
    id,
    friendId,
  },
  withCredentials: true,
});

export const removeAllFriends = (id: string): AxiosRequestConfig => ({
  url: `${url}/remove-all-friends/${id}`,
  method: "patch",
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
  method: "patch",
  data: {
    id,
    publicity,
  },
  withCredentials: true,
});
