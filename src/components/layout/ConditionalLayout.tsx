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

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const hideLayout = pathname?.startsWith('/login') || pathname?.startsWith('/signup');

  useEffect(() => {
    // Initial check
    const authenticated = checkAuthentication();
    console.log('authenticated', authenticated);
    setIsAuthenticated(authenticated);
    setIsLoading(false);

    // Listen for storage changes (e.g., when user logs in/out in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === null || e.key === USER_PREFERENCES) {
        const authenticated = checkAuthentication();
        setIsAuthenticated(authenticated);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Show loading state or nothing while checking
  if (isLoading) {
    return <>{children}</>;
  }

  return (
    <>
      {!hideLayout && isAuthenticated && <Header />}
      <main className='min-h-screen w-full h-full'>{children}</main>
      {!hideLayout && isAuthenticated && <Footer />}
    </>
  );
}

