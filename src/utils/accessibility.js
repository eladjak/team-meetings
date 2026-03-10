/**
 * מודול נגישות מרכזי
 * מכיל פונקציות עזר ומשתנים לניהול נגישות באפליקציה
 * 
 * @module accessibility
 */

import logger from './logger';

// קבועים לנגישות
export const ACCESSIBILITY_SETTINGS = {
  FONT_SIZES: {
    SMALL: 85,
    NORMAL: 100,
    LARGE: 115,
    XLARGE: 130
  },
  CONTRAST_MODES: {
    NORMAL: 'normal',
    HIGH: 'high',
    INVERTED: 'inverted'
  },
  ANIMATION_SPEEDS: {
    OFF: 'off',
    SLOW: 'slow',
    NORMAL: 'normal'
  }
};

/**
 * עדכון גודל טקסט
 * @param {number} size - אחוז מהגודל הרגיל
 */
export const setFontSize = (size) => {
  logger.debug('Accessibility: Setting font size', { size });
  document.documentElement.style.fontSize = `${size}%`;
  localStorage.setItem('accessibility_fontSize', size);
};

/**
 * עדכון מצב ניגודיות
 * @param {string} mode - מצב ניגודיות
 */
export const setContrastMode = (mode) => {
  logger.debug('Accessibility: Setting contrast mode', { mode });
  document.body.dataset.contrast = mode;
  localStorage.setItem('accessibility_contrast', mode);

  // הוספת/הסרת קלאסים רלוונטיים
  document.body.classList.remove('high-contrast', 'inverted-colors');
  if (mode === ACCESSIBILITY_SETTINGS.CONTRAST_MODES.HIGH) {
    document.body.classList.add('high-contrast');
  } else if (mode === ACCESSIBILITY_SETTINGS.CONTRAST_MODES.INVERTED) {
    document.body.classList.add('inverted-colors');
  }
};

/**
 * עדכון מהירות אנימציות
 * @param {string} speed - מהירות אנימציות
 */
export const setAnimationSpeed = (speed) => {
  logger.debug('Accessibility: Setting animation speed', { speed });
  document.body.dataset.animations = speed;
  localStorage.setItem('accessibility_animations', speed);

  // עדכון משתני CSS
  if (speed === ACCESSIBILITY_SETTINGS.ANIMATION_SPEEDS.OFF) {
    document.body.style.setProperty('--transition-duration', '0s');
  } else if (speed === ACCESSIBILITY_SETTINGS.ANIMATION_SPEEDS.SLOW) {
    document.body.style.setProperty('--transition-duration', '0.5s');
  } else {
    document.body.style.setProperty('--transition-duration', '0.3s');
  }
};

/**
 * טעינת הגדרות נגישות שמורות
 */
export const loadAccessibilitySettings = () => {
  logger.debug('Accessibility: Loading saved settings');

  // טעינת גודל טקסט
  const savedFontSize = localStorage.getItem('accessibility_fontSize');
  if (savedFontSize) {
    setFontSize(Number(savedFontSize));
  }

  // טעינת מצב ניגודיות
  const savedContrast = localStorage.getItem('accessibility_contrast');
  if (savedContrast) {
    setContrastMode(savedContrast);
  }

  // טעינת מהירות אנימציות
  const savedAnimations = localStorage.getItem('accessibility_animations');
  if (savedAnimations) {
    setAnimationSpeed(savedAnimations);
  }

  // בדיקת העדפות מערכת
  checkSystemPreferences();
};

/**
 * בדיקת העדפות מערכת
 */
const checkSystemPreferences = () => {
  logger.debug('Accessibility: Checking system preferences');

  // בדיקת העדפת הפחתת תנועה
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    setAnimationSpeed(ACCESSIBILITY_SETTINGS.ANIMATION_SPEEDS.OFF);
  }

  // בדיקת העדפת ניגודיות גבוהה
  const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');
  if (prefersHighContrast.matches) {
    setContrastMode(ACCESSIBILITY_SETTINGS.CONTRAST_MODES.HIGH);
  }

  // הוספת מאזינים לשינויים
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      setAnimationSpeed(ACCESSIBILITY_SETTINGS.ANIMATION_SPEEDS.OFF);
    }
  });

  prefersHighContrast.addEventListener('change', (e) => {
    if (e.matches) {
      setContrastMode(ACCESSIBILITY_SETTINGS.CONTRAST_MODES.HIGH);
    }
  });
};

/**
 * הוספת תיאורי ARIA לאלמנט
 * @param {HTMLElement} element - האלמנט
 * @param {Object} descriptions - תיאורים להוספה
 */
export const addAriaDescriptions = (element, descriptions) => {
  logger.debug('Accessibility: Adding ARIA descriptions', { descriptions });
  
  Object.entries(descriptions).forEach(([key, value]) => {
    element.setAttribute(`aria-${key}`, value);
  });
};

/**
 * יצירת קיצורי מקלדת
 * @param {Object} shortcuts - מיפוי קיצורים לפונקציות
 */
export const setupKeyboardShortcuts = (shortcuts) => {
  logger.debug('Accessibility: Setting up keyboard shortcuts', { shortcuts });

  document.addEventListener('keydown', (event) => {
    // בדיקה אם המיקוד נמצא בשדה טקסט
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    const shortcut = `${event.ctrlKey ? 'Ctrl+' : ''}${event.key}`;
    const action = shortcuts[shortcut];

    if (action) {
      event.preventDefault();
      action(event);
    }
  });
};

export default {
  ACCESSIBILITY_SETTINGS,
  setFontSize,
  setContrastMode,
  setAnimationSpeed,
  loadAccessibilitySettings,
  addAriaDescriptions,
  setupKeyboardShortcuts
};