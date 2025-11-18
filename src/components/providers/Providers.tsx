'use client';

import { ThemeProvider } from '@/contexts/ThemeProvider';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { LanguageProvider } from '@/contexts/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Provider store={store}>{children}</Provider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
