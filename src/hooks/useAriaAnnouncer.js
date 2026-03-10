/**
 * הוק להודעות נגישות דינמיות
 * מאפשר הקראת הודעות למשתמשי קורא מסך
 * 
 * @module useAriaAnnouncer
 */

import { useCallback, useEffect, useRef } from 'react';

export const useAriaAnnouncer = () => {
  const announcerRef = useRef(null);

  useEffect(() => {
    console.log('AriaAnnouncer: Initializing');
    
    // יצירת אלמנט ההכרזה
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.setAttribute('class', 'sr-only');
    document.body.appendChild(announcer);
    
    announcerRef.current = announcer;

    return () => {
      console.log('AriaAnnouncer: Cleaning up');
      announcer.remove();
    };
  }, []);

  /**
   * הכרזה על הודעה חדשה
   * @param {string} message - ההודעה להקראה
   * @param {Object} options - אפשרויות נוספות
   * @param {boolean} options.assertive - האם להקריא מיד (ברירת מחדל: false)
   */
  const announce = useCallback((message, { assertive = false } = {}) => {
    console.log('AriaAnnouncer: Announcing message:', message);
    
    if (!announcerRef.current) return;

    // עדכון רמת הדחיפות
    announcerRef.current.setAttribute(
      'aria-live',
      assertive ? 'assertive' : 'polite'
    );

    // הקראת ההודעה
    announcerRef.current.textContent = '';
    setTimeout(() => {
      announcerRef.current.textContent = message;
    }, 100);
  }, []);

  /**
   * הכרזה על שינוי סטטוס
   * @param {string} status - הסטטוס החדש
   */
  const announceStatus = useCallback((status) => {
    console.log('AriaAnnouncer: Announcing status:', status);
    announce(`סטטוס: ${status}`, { assertive: true });
  }, [announce]);

  /**
   * הכרזה על שגיאה
   * @param {string} error - הודעת השגיאה
   */
  const announceError = useCallback((error) => {
    console.log('AriaAnnouncer: Announcing error:', error);
    announce(`שגיאה: ${error}`, { assertive: true });
  }, [announce]);

  return {
    announce,
    announceStatus,
    announceError
  };
}; 