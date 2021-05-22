import axios from "axios";
// import { isTokenExpired } from './auth';

export const client = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    let token: any = localStorage.getItem("jwtToken");
    token = JSON.parse(token);
    config.headers.Authorization = `${token}`;

    return config;
  });

  return instance;
};

export const setAuthToken = (token: string) => {
  if (token) {
    // Apply to every request headers with axios.defaults.headers.common
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
