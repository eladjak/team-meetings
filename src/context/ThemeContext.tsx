/**
 * קונטקסט לניהול ערכת נושא
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '@mui/material/styles';
import { createAppTheme } from '../theme';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('theme_mode');
    return (savedMode === 'dark' ? 'dark' : 'light');
  });

  const theme = React.useMemo(() => {
    console.log('ThemeProvider: Creating theme with mode:', mode);
    return createAppTheme(mode);
  }, [mode]);

  useEffect(() => {
    console.log('ThemeProvider: Saving theme mode:', mode);
    localStorage.setItem('theme_mode', mode);
  }, [mode]);

  const value = React.useMemo(() => ({
    mode,
    toggleTheme: () => setMode(prevMode => prevMode === 'light' ? 'dark' : 'light'),
    theme
  }), [mode, theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider; 