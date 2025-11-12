import { USER_PREFERENCES } from "@/global/constants";

export const userPreferences = {
  get(key: string, defaultValue: any = null) {
    try {
      const data = JSON.parse(localStorage.getItem(USER_PREFERENCES) || '{}');
      return data[key] ?? defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key: string, value: any) {
    try {
      const data = JSON.parse(localStorage.getItem(USER_PREFERENCES) || '{}');
      data[key] = value;
      localStorage.setItem(USER_PREFERENCES, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save user preference', error);
    }
  },

  remove(key: string) {
    try {
      const data = JSON.parse(localStorage.getItem(USER_PREFERENCES) || '{}');
      delete data[key];
      localStorage.setItem(USER_PREFERENCES, JSON.stringify(data));
    } catch {}
  },

  clear() {
    localStorage.removeItem(USER_PREFERENCES);
  }
};
