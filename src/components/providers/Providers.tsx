"use client";

import { ThemeProvider } from '@/contexts/ThemeProvider';
import { Provider } from 'react-redux';
import store from '@/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
}

