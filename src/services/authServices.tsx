import { ACCESS_TOKEN, nonAuthenticatedPaths, USER_DETAILS } from '@/global/constants';
import { isEmpty } from '@/helper/helper';
import { userPreferences } from '@/helper/userPreferenceSingleton';

export const isAuthenticated = (path: string): boolean => {
  // Check if the path requires authentication
  const userDetails = userPreferences.get(USER_DETAILS);

  // if router is private and not logged
  if (!nonAuthenticatedPaths.includes(path) && isEmpty(userDetails?._id)) return false;
  return true;
};

export const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.status === 200) {
    userPreferences.set(USER_DETAILS, data?.data);
    return data;
  } else {
    throw new Error(data?.message || 'Login failed');
  }
};

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password })
  });
  const data = await response.json();
  if (response.status === 200) {
    return data;
  } else {
    throw new Error(data?.message || 'Signup failed');
  }
};
