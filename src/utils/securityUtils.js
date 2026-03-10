/**
 * פונקציות עזר לאבטחת המערכת
 * @module securityUtils
 */

/**
 * בדיקת תוקף טוקן
 * @param {string} token - הטוקן לבדיקה
 * @returns {boolean} האם הטוקן תקף
 */
export const validateToken = (token) => {
  console.log('securityUtils: Validating token');
  
  if (!token) {
    console.warn('securityUtils: No token provided');
    return false;
  }

  try {
    // בדיקת מבנה הטוקן
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) {
      throw new Error('Invalid token structure');
    }

    // בדיקת תפוגה
    const decodedPayload = JSON.parse(atob(payload));
    const expirationTime = decodedPayload.exp * 1000;
    
    return Date.now() < expirationTime;
  } catch (error) {
    console.error('securityUtils: Token validation error:', error);
    return false;
  }
};

/**
 * הצפנת מידע רגיש
 * @param {string} data - המידע להצפנה
 * @returns {string} המידע המוצפן
 */
export const encryptSensitiveData = (data) => {
  console.log('securityUtils: Encrypting sensitive data');
  
  try {
    // כאן תהיה לוגיקת ההצפנה האמיתית
    return btoa(data);
  } catch (error) {
    console.error('securityUtils: Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * סינון קלט למניעת XSS
 * @param {string} input - הקלט לסינון
 * @returns {string} הקלט המסונן
 */
export const sanitizeInput = (input) => {
  console.log('securityUtils: Sanitizing input');
  
  if (typeof input !== 'string') {
    console.warn('securityUtils: Non-string input provided');
    return '';
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}; 