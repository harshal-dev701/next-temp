import { nonAuthenticatedPaths, USER_DETAILS } from "@/global/constants";
import { isEmpty } from "@/helper/helper";
import { userPreferences } from "@/helper/userPreferenceSingleton";

export const isAuthenticated = (path: string): boolean => {
    // Check if the path requires authentication
    const userDetails = userPreferences.get(USER_DETAILS);
  
    // if router is private and not logged
    if (!nonAuthenticatedPaths.includes(path) && isEmpty(userDetails?._id)) return false
    return true
  };