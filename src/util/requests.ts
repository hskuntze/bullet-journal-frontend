import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
// import history from "./navigate";
import { getAuthData } from "./storage";

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? "ax194lxs2ll154";
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "pog15mmn6716";

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

axios.interceptors.response.use(
  function (response) {
    //Qualquer status code entre os 2xx vai dar trigger nessa função
    return response;
  },
  function (error) {
    //Qualquer status code fora dos 2xx vai dar trigger nessa função
    switch(error.response.status){
      case 401:
        localStorage.setItem("401", "Erro na aplicação, tente novamente mais tarde.");
        break;
      case 403:
        localStorage.setItem("403", "Você não possui a autorização necessária.");
        break;
      case 409:
        localStorage.setItem("409", "Nome e/ou email já existentes.");
        break;
    }
    return Promise.reject(error);
  }
);
