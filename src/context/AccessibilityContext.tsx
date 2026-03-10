import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
}

interface AccessibilityContextType {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  setFontSize: (size: number) => void;
  toggleContrast: () => void;
  toggleMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    console.log('AccessibilityProvider: Initializing settings');
    const saved = localStorage.getItem('accessibility_settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 100,
      highContrast: false,
      reducedMotion: false
    };
  });

  useEffect(() => {
    console.log('AccessibilityProvider: Settings changed', settings);
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
  }, [settings]);

  const value = {
    ...settings,
    setFontSize: (size: number) => {
      console.log('Setting font size:', size);
      setSettings((prev: AccessibilitySettings) => ({ ...prev, fontSize: size }));
    },
    toggleContrast: () => {
      console.log('Toggling contrast');
      setSettings((prev: AccessibilitySettings) => ({ ...prev, highContrast: !prev.highContrast }));
    },
    toggleMotion: () => {
      console.log('Toggling motion');
      setSettings((prev: AccessibilitySettings) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
    }
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 