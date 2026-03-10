/**
 * מידלוור לוולידציה של בקשות
 * מוודא תקינות נתונים לפני עיבוד הבקשה
 * 
 * @module validation
 */

import logger from '../utils/logger.js';
import { isValidDate } from '../utils/dateUtils.js';

/**
 * וולידציה לפגישה חדשה/עדכון
 */
export const validateMeeting = (req, res, next) => {
  logger.debug('Validation: Validating meeting data', { body: req.body });

  const errors = [];
  const { description, startTime, endTime, developmentGroupId, participants } = req.body;

  // בדיקת שדות חובה
  if (!description?.trim()) {
    errors.push('תיאור הפגישה הוא שדה חובה');
  }

  if (!startTime || !isValidDate(startTime)) {
    errors.push('זמן התחלה אינו תקין');
  }

  if (!endTime || !isValidDate(endTime)) {
    errors.push('זמן סיום אינו תקין');
  }

  // בדיקת תקינות זמנים
  if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
    errors.push('זמן הסיום חייב להיות אחרי זמן ההתחלה');
  }

  // בדיקת צוות
  if (!developmentGroupId || isNaN(developmentGroupId)) {
    errors.push('צוות הפיתוח הוא שדה חובה');
  }

  // בדיקת משתתפים
  if (participants && !Array.isArray(participants)) {
    errors.push('פורמט המשתתפים אינו תקין');
  }

  if (errors.length > 0) {
    logger.warn('Validation: Meeting validation failed', { errors });
    return res.status(400).json({ errors });
  }

  next();
};

/**
 * וולידציה למשתמש חדש/עדכון
 */
export const validateUser = (req, res, next) => {
  logger.debug('Validation: Validating user data', { body: req.body });

  const errors = [];
  const { name, email, developmentGroupId } = req.body;

  // בדיקת שם
  if (!name?.trim()) {
    errors.push('שם המשתמש הוא שדה חובה');
  }

  // בדיקת אימייל
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('כתובת האימייל אינה תקינה');
  }

  // בדיקת צוות
  if (developmentGroupId && isNaN(developmentGroupId)) {
    errors.push('מזהה הצוות אינו תקין');
  }

  if (errors.length > 0) {
    logger.warn('Validation: User validation failed', { errors });
    return res.status(400).json({ errors });
  }

  next();
};

/**
 * וולידציה לחדר חדש/עדכון
 */
export const validateRoom = (req, res, next) => {
  logger.debug('Validation: Validating room data', { body: req.body });

  const errors = [];
  const { name, capacity } = req.body;

  // בדיקת שם
  if (!name?.trim()) {
    errors.push('שם החדר הוא שדה חובה');
  }

  // בדיקת קיבולת
  if (capacity && (isNaN(capacity) || capacity < 1)) {
    errors.push('קיבולת החדר אינה תקינה');
  }

  if (errors.length > 0) {
    logger.warn('Validation: Room validation failed', { errors });
    return res.status(400).json({ errors });
  }

  next();
};

/**
 * וולידציה לתגית חדשה/עדכון
 */
export const validateTag = (req, res, next) => {
  logger.debug('Validation: Validating tag data', { body: req.body });

  const errors = [];
  const { name } = req.body;

  if (!name?.trim()) {
    errors.push('שם התגית הוא שדה חובה');
  }

  if (errors.length > 0) {
    logger.warn('Validation: Tag validation failed', { errors });
    return res.status(400).json({ errors });
  }

  next();
};