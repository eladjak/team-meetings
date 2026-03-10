/**
 * אוסף פונקציות עזר לטיפול בתאריכים ושעות
 * @module dateUtils
 */

/**
 * מפרמט תאריך ושעה לפורמט מקומי בעברית
 * לדוגמה: "1 בינואר 2024, 09:00"
 * 
 * @param {string|Date} date - תאריך לפירמוט
 * @returns {string} תאריך מפורמט בעברית
 */
export const formatDateTime = (date) => {
  console.log('dateUtils: Formatting date and time:', date);
  
  if (!date) {
    console.warn('dateUtils: Empty date provided');
    return '';
  }
  
  try {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    
    const formattedDate = new Date(date).toLocaleDateString('he-IL', options);
    console.log('dateUtils: Formatted date:', formattedDate);
    return formattedDate;
  } catch (error) {
    console.error('dateUtils: Error formatting date:', error);
    return 'תאריך לא תקין';
  }
};

/**
 * מפרמט שעה בלבד לפורמט מקומי
 * לדוגמה: "09:00"
 * 
 * @param {string|Date} date - תאריך לפירמוט
 * @returns {string} שעה מפורמטת
 */
export const formatTime = (date) => {
  console.log('dateUtils: Formatting time:', date);
  
  if (!date) {
    console.warn('dateUtils: Empty date provided');
    return '';
  }
  
  try {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    
    const formattedTime = new Date(date).toLocaleTimeString('he-IL', options);
    console.log('dateUtils: Formatted time:', formattedTime);
    return formattedTime;
  } catch (error) {
    console.error('dateUtils: Error formatting time:', error);
    return 'שעה לא תקינה';
  }
};

/**
 * בודק אם שני תאריכים הם באותו יום
 * 
 * @param {string|Date} date1 - תאריך ראשון להשוואה
 * @param {string|Date} date2 - תאריך שני להשוואה
 * @returns {boolean} האם התאריכים באותו יום
 */
export const isSameDay = (date1, date2) => {
  console.log('dateUtils: Comparing dates:', { date1, date2 });
  
  if (!date1 || !date2) {
    console.warn('dateUtils: Missing date for comparison');
    return false;
  }
  
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    const result = d1.getFullYear() === d2.getFullYear() &&
                  d1.getMonth() === d2.getMonth() &&
                  d1.getDate() === d2.getDate();
                  
    console.log('dateUtils: Dates comparison result:', result);
    return result;
  } catch (error) {
    console.error('dateUtils: Error comparing dates:', error);
    return false;
  }
};

/**
 * מחזיר את מספר הדקות בין שני תאריכים
 * 
 * @param {string|Date} start - תאריך התחלה
 * @param {string|Date} end - תאריך סיום
 * @returns {number} מספר הדקות בין התאריכים
 */
export const getMinutesBetween = (start, end) => {
  console.log('dateUtils: Calculating minutes between:', { start, end });
  
  if (!start || !end) {
    console.warn('dateUtils: Missing date for calculation');
    return 0;
  }
  
  try {
    const diff = new Date(end) - new Date(start);
    const minutes = Math.floor(diff / 1000 / 60);
    
    console.log('dateUtils: Minutes difference:', minutes);
    return minutes;
  } catch (error) {
    console.error('dateUtils: Error calculating minutes:', error);
    return 0;
  }
};