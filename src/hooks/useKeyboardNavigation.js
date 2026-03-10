/**
 * הוק לניהול ניווט מקלדת באפליקציה
 * מאפשר ניווט נגיש באמצעות מקלדת בלבד
 * 
 * @module useKeyboardNavigation
 */

import { useEffect, useCallback } from 'react';

export const useKeyboardNavigation = () => {
  /**
   * טיפול בניווט בין אירועים בלוח
   */
  const handleEventNavigation = useCallback((event, currentFocusedEvent) => {
    console.log('useKeyboardNavigation: Handling event navigation');

    const events = document.querySelectorAll('.fc-event');
    const currentIndex = Array.from(events).indexOf(currentFocusedEvent);

    switch (event.key) {
      case 'ArrowRight':
        if (currentIndex > 0) {
          events[currentIndex - 1].focus();
        }
        break;
      case 'ArrowLeft':
        if (currentIndex < events.length - 1) {
          events[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        // מציאת האירוע בשורה הקודמת באותו טור
        break;
      case 'ArrowDown':
        // מציאת האירוע בשורה הבאה באותו טור
        break;
      case 'Enter':
      case ' ':
        currentFocusedEvent.click();
        event.preventDefault();
        break;
      default:
        return;
    }
  }, []);

  /**
   * טיפול בקיצורי מקלדת גלובליים
   */
  const handleGlobalShortcuts = useCallback((event) => {
    console.log('useKeyboardNavigation: Handling global shortcuts');

    // בדיקה אם המיקוד נמצא בשדה טקסט
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'f':
          // פתיחת חיפוש
          event.preventDefault();
          document.querySelector('[aria-label="חיפוש"]')?.click();
          break;
        case 'n':
          // יצירת פגישה חדשה
          event.preventDefault();
          document.querySelector('[aria-label="פגישה חדשה"]')?.click();
          break;
        case 'h':
          // פתיחת עזרה
          event.preventDefault();
          document.querySelector('[aria-label="עזרה"]')?.click();
          break;
        default:
          return;
      }
    } else {
      switch (event.key) {
        case 'Escape':
          // סגירת דיאלוגים פתוחים
          document.querySelector('[aria-label="סגור"]')?.click();
          break;
        case '?':
          // הצגת קיצורי מקלדת
          event.preventDefault();
          document.querySelector('[aria-label="קיצורי מקלדת"]')?.click();
          break;
        default:
          return;
      }
    }
  }, []);

  /**
   * הוספת מאזינים לאירועי מקלדת
   */
  useEffect(() => {
    console.log('useKeyboardNavigation: Setting up keyboard listeners');

    const handleKeyDown = (event) => {
      const focusedEvent = document.activeElement.closest('.fc-event');
      if (focusedEvent) {
        handleEventNavigation(event, focusedEvent);
      } else {
        handleGlobalShortcuts(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      console.log('useKeyboardNavigation: Cleaning up keyboard listeners');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleEventNavigation, handleGlobalShortcuts]);

  return {
    // קיצורי מקלדת זמינים
    shortcuts: {
      global: {
        'Ctrl + F': 'חיפוש',
        'Ctrl + N': 'פגישה חדשה',
        'Ctrl + H': 'עזרה',
        'Escape': 'סגירה',
        '?': 'הצגת קיצורי מקלדת'
      },
      calendar: {
        'חצים': 'ניווט בין אירועים',
        'Enter/Space': 'פתיחת אירוע',
        'Tab': 'מעבר בין אלמנטים'
      }
    }
  };
}; 