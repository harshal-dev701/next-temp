import axios from "axios";
import { ACCESS_TOKEN } from "./global/constants";
import { userPreferences } from "./helper/userPreferenceSingleton";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const requestHandler = (request) => {
  const access_token = userPreferences.get(ACCESS_TOKEN);

  if (access_token) {
    request.headers.Authorization = `Bearer ${access_token}`;
  }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401 || response.status === 403) {
    if(typeof window !== 'undefined') {
      window.location.href = "/";
    }
    userPreferences.remove(ACCESS_TOKEN);
    userPreferences.clear();
  }
  return response;
};

const requestErrorHandler = (error) => {
  return Promise.reject(error);
};

const responseErrorHandler = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      userPreferences.remove(ACCESS_TOKEN);
      userPreferences.clear();
      if(typeof window !== 'undefined') {
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => requestErrorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  responseErrorHandler
);

export default customAxios;
