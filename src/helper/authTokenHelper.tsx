import { jwtDecode } from 'jwt-decode';
import { userPreferences } from './userPreferenceSingleton';
import { ACCESS_TOKEN } from '@/global/constants';

export const setupToken = () => {
  const access_token = userPreferences.get(ACCESS_TOKEN);

  if (access_token) {
    const decoded: { exp: number } = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      return access_token;
    }
  }
  return false; // if no token or expired token, return fals
};
