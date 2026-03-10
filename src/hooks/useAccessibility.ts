/**
 * הוק לניהול הגדרות נגישות
 */

import { useState, useEffect, createContext, useContext } from 'react';

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

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibilitySettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
    document.body.setAttribute('data-contrast', settings.contrast);
    document.body.setAttribute('data-reduced-motion', String(settings.reducedMotion));
  }, [settings]);

  const changeFontSize = (size: number) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };

  const toggleContrast = () => {
    setSettings(prev => ({
      ...prev,
      contrast: prev.contrast === 'normal' ? 'high' : prev.contrast === 'high' ? 'dark' : 'normal'
    }));
  };

  const toggleMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleScreenReader = () => {
    setSettings(prev => ({ ...prev, screenReader: !prev.screenReader }));
  };

  return {
    settings,
    changeFontSize,
    toggleContrast,
    toggleMotion,
    toggleScreenReader
  };
};

export default useAccessibility; 