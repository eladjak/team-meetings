import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'dark';
  reducedMotion: boolean;
  screenReader: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  changeFontSize: (size: number) => void;
  toggleContrast: () => void;
  toggleMotion: () => void;
  toggleScreenReader: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  contrast: 'normal',
  reducedMotion: false,
  screenReader: false
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [settings]);

  const value = {
    settings,
    changeFontSize: (size: number) => setSettings(prev => ({ ...prev, fontSize: size })),
    toggleContrast: () => setSettings(prev => ({
      ...prev,
      contrast: prev.contrast === 'normal' ? 'high' : prev.contrast === 'high' ? 'dark' : 'normal'
    })),
    toggleMotion: () => setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion })),
    toggleScreenReader: () => setSettings(prev => ({ ...prev, screenReader: !prev.screenReader }))
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