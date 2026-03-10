/**
 * מערכת לוגים מרכזית
 * מאפשרת תיעוד פעולות ושגיאות במערכת
 * 
 * @module logger
 */

import { Analytics } from './analytics';

// רמות לוג
export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // מספר מקסימלי של לוגים בזיכרון
  }

  /**
   * הוספת לוג חדש
   * @param {string} level - רמת הלוג
   * @param {string} message - הודעת הלוג
   * @param {Object} data - נתונים נוספים
   */
  log(level, message, data = {}) {
    const logEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      sessionId: this.getSessionId()
    };

    // הוספה למערך הלוגים
    this.logs.unshift(logEntry);
    
    // שמירה על גודל מקסימלי
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // הדפסה לקונסול
    this.printToConsole(logEntry);

    // שליחה לאנליטיקס
    if (level === LOG_LEVELS.ERROR) {
      Analytics.trackError(new Error(message), data);
    }

    // שמירה בלוקל סטורג'
    this.saveToStorage();
  }

  // פונקציות נוחות
  debug(message, data) {
    this.log(LOG_LEVELS.DEBUG, message, data);
  }

  info(message, data) {
    this.log(LOG_LEVELS.INFO, message, data);
  }

  warn(message, data) {
    this.log(LOG_LEVELS.WARN, message, data);
  }

  error(message, data) {
    this.log(LOG_LEVELS.ERROR, message, data);
  }

  /**
   * הדפסת לוג לקונסול
   * @param {Object} logEntry - פרטי הלוג
   */
  printToConsole(logEntry) {
    const { level, message, data, timestamp } = logEntry;
    const time = timestamp.toLocaleTimeString();
    
    switch (level) {
      case LOG_LEVELS.DEBUG:
        console.debug(`[${time}] 🔍 ${message}`, data);
        break;
      case LOG_LEVELS.INFO:
        console.info(`[${time}] ℹ️ ${message}`, data);
        break;
      case LOG_LEVELS.WARN:
        console.warn(`[${time}] ⚠️ ${message}`, data);
        break;
      case LOG_LEVELS.ERROR:
        console.error(`[${time}] ❌ ${message}`, data);
        break;
    }
  }

  /**
   * שמירת הלוגים בלוקל סטורג'
   */
  saveToStorage() {
    try {
      localStorage.setItem('app_logs', JSON.stringify(this.logs.slice(0, 100)));
    } catch (error) {
      console.error('Logger: Error saving to storage:', error);
    }
  }

  /**
   * קבלת מזהה סשן
   * @returns {string} מזהה הסשן
   */
  getSessionId() {
    if (!this._sessionId) {
      this._sessionId = Math.random().toString(36).substring(2);
    }
    return this._sessionId;
  }

  /**
   * קבלת כל הלוגים
   * @returns {Array} מערך הלוגים
   */
  getLogs() {
    return this.logs;
  }

  /**
   * קבלת לוגים מסוננים
   * @param {string} level - רמת הלוג לסינון
   * @returns {Array} מערך הלוגים המסונן
   */
  getLogsByLevel(level) {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * ניקוי הלוגים
   */
  clearLogs() {
    this.logs = [];
    localStorage.removeItem('app_logs');
  }
}

// ייצוא סינגלטון
export default new Logger(); 