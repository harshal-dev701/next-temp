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
    userPreferences.set(USER_DETAILS, response?.data?.data);
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

export const sendForgotPasswordOTP = async (email: string) => {
  const response = await customAxios.post('/auth/forgot-password', {
    email
  });
  if (response.status === 200) {
    return response?.data;
  } else {
    throw new Error(response?.data?.message || 'Failed to send OTP');
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  const response = await customAxios.post('/auth/verify-otp', {
    email,
    otp
  });
  if (response.status === 200) {
    return response?.data;
  } else {
    throw new Error(response?.data?.message || 'OTP verification failed');
  }
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  const response = await customAxios.post('/auth/reset-password', {
    email,
    otp,
    newPassword
  });
  if (response.status === 200) {
    return response?.data;
  } else {
    throw new Error(response?.data?.message || 'Password reset failed');
  }
};