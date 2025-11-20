'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import { USER_DETAILS, USER_PREFERENCES } from '@/global/constants';
import { userPreferences } from '@/helper/userPreferenceSingleton';
import { setupToken } from '@/helper/authTokenHelper';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const checkAuthentication = (): boolean => {
  const accessToken = setupToken();
  const userData = userPreferences.get(USER_DETAILS);
  return !!(accessToken || userData);
};

const clearAuthCookie = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Failed to clear auth cookie:', error);
  }
};

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication());
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Function to check and clear cookie if user_preferences is missing
  const checkAndClearCookieIfNeeded = async () => {
    const userPrefs = localStorage.getItem(USER_PREFERENCES);
    if (!userPrefs) {
      // user_preferences is missing, clear the cookie
      await clearAuthCookie();
    }
  };

  useEffect(() => {
    // Check on mount if user_preferences is missing
    checkAndClearCookieIfNeeded();

    // Listen for storage changes (e.g., when user logs in/out in other tabs)
    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key === null || e.key === USER_PREFERENCES) {
        await checkAndClearCookieIfNeeded();
        const authenticated = checkAuthentication();
        setIsAuthenticated(authenticated);
      }
    };

    // Listen for custom localStorageChange event (from userPreferenceSingleton)
    const handleLocalStorageChange = async () => {
      await checkAndClearCookieIfNeeded();
      const authenticated = checkAuthentication();
      setIsAuthenticated(authenticated);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleLocalStorageChange);
    setIsLoading(false);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleLocalStorageChange);
    };
  }, []);

  // Check on route changes as well
  useEffect(() => {
    checkAndClearCookieIfNeeded();
    const authenticated = checkAuthentication();
    setIsAuthenticated(authenticated);
  }, [pathname]);

  return (
    <>
      {!isLoading && (
        <>
          {isAuthenticated && <Header />}
          <main className='min-h-screen w-full h-full dark:bg-gray-900 bg-white transition-all duration-500'>
            {children}
          </main>
          {isAuthenticated && <Footer />}
        </>
      )}
    </>
  );
}
