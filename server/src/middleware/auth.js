/**
 * מידלוור אבטחה והרשאות
 */

import logger from '../utils/logger.js';

// פונקציית ביניים פשוטה לבדיקת הרשאות
export const checkPermissions = (requiredPermission) => {
  return (req, res, next) => {
    logger.debug('Checking permissions', { requiredPermission });
    
    // כרגע מאשר הכל בשביל הפיתוח
    next();
  };
};

// קבועי הרשאות בסיסיים
export const PERMISSIONS = {
  VIEW_MEETINGS: 'VIEW_MEETINGS',
  CREATE_MEETING: 'CREATE_MEETING',
  EDIT_MEETING: 'EDIT_MEETING',
  DELETE_MEETING: 'DELETE_MEETING'
}; 