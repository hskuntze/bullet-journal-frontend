import axios, { AxiosRequestConfig } from "axios";
import { getAuthData } from "./storage";
//import config from "../config";
import qs from "qs";

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL;// ?? "http://localhost:8080";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;// ?? config.CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;// ?? config.CLIENT_SECRET;

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });

  return axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);