import axios from "axios";
import { ACCESS_TOKEN } from "./global/constants";
import { userPreferences } from "./helper/userPreferenceSingleton";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const requestHandler = (request: any) => {
  const access_token = userPreferences.get(ACCESS_TOKEN);

  if (access_token) {
    request.headers.Authorization = `Bearer ${access_token}`;
  }
  return request;
};

const responseHandler = (response: any) => {
  if (response.status === 401 || response.status === 403) {
    // Check if the request is to an authentication endpoint
    const requestUrl = response.config?.url || '';
    const authEndpoints = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-otp'];
    const isAuthEndpoint = authEndpoints.some(endpoint => requestUrl.includes(endpoint));
    
    // Don't clear user preferences or redirect if it's an authentication endpoint
    // (e.g., login failure should not trigger logout)
    if (!isAuthEndpoint) {
      userPreferences.remove(ACCESS_TOKEN);
      userPreferences.clear();
      
      // Don't redirect if we're on authentication pages (login, signup, forgot password)
      if(typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const authPages = ['/login', '/signup', '/forgotPassword'];
        const isAuthPage = authPages.some(page => currentPath.startsWith(page));
        
        if (!isAuthPage) {
          window.location.href = "/";
        }
      }
    }
  }
  return response;
};

const requestErrorHandler = (error: any) => {
  return Promise.reject(error);
};

const responseErrorHandler = (error: any) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      // Check if the request is to an authentication endpoint
      const requestUrl = error.config?.url || '';
      const authEndpoints = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-otp'];
      const isAuthEndpoint = authEndpoints.some(endpoint => requestUrl.includes(endpoint));
      
      // Don't clear user preferences or redirect if it's an authentication endpoint
      // (e.g., login failure should not trigger logout)
      if (!isAuthEndpoint) {
        userPreferences.remove(ACCESS_TOKEN);
        userPreferences.clear();
        
        // Don't redirect if we're on authentication pages (login, signup, forgot password)
        if(typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          const authPages = ['/login', '/signup', '/forgotPassword'];
          const isAuthPage = authPages.some(page => currentPath.startsWith(page));
          
          if (!isAuthPage) {
            window.location.href = "/";
          }
        }
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
