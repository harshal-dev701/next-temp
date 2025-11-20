import { ACCESS_TOKEN, nonAuthenticatedPaths, USER_DETAILS } from '@/global/constants';
import { isEmpty } from '@/helper/helper';
import { userPreferences } from '@/helper/userPreferenceSingleton';
import customAxios from '@/serverCall';

export const isAuthenticated = (path: string): boolean => {
  // Check if the path requires authentication
  const userDetails = userPreferences.get(USER_DETAILS);

  // if router is private and not logged
  if (!nonAuthenticatedPaths.includes(path) && isEmpty(userDetails?._id)) return false;
  return true;
};

export const login = async (email: string, password: string) => {
  const response = await customAxios.post('/auth/login', {
    email,
    password
  });
  if (response.status === 200) {
    userPreferences.set(USER_DETAILS, response?.data);
    return response?.data;
  } else {
    throw new Error(response?.data?.message || 'Login failed');
  }
};

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
  const response = await customAxios.post('/auth/signup', {
    firstName,
    lastName,
    email,
    password
  });
  if (response.status === 200) {
    return response?.data;
  } else {
    throw new Error(response?.data?.message || 'Signup failed');
  }
};
