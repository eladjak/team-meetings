/**
 * אוסף פונקציות עזר לטיפול בצבעים
 * @module colorUtils
 */

/**
 * מייצר צבע ייחודי מבוסס על מחרוזת
 * משמש ליצירת צבעי רקע לאווטארים של משתמשים
 * 
 * @param {string} string - מחרוזת הקלט (בד"כ שם המשתמש)
 * @returns {string} קוד צבע HEX
 */
export const stringToColor = (string) => {
  console.log('colorUtils: Generating color for string:', string);
  
  if (!string) {
    console.warn('colorUtils: Empty string provided');
    return '#000000';
  }
  
  try {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }

    console.log('colorUtils: Generated color:', color);
    return color;
  } catch (error) {
    console.error('colorUtils: Error generating color:', error);
    return '#000000';
  }
};

/**
 * מחשב צבע טקסט מנוגד (שחור או לבן) בהתאם לצבע הרקע
 * 
 * @param {string} backgroundColor - צבע הרקע בפורמט HEX
 * @returns {string} '#000000' לטקסט שחור או '#FFFFFF' לטקסט לבן
 */
export const getContrastText = (backgroundColor) => {
  console.log('colorUtils: Calculating contrast text color for:', backgroundColor);
  
  if (!backgroundColor || backgroundColor.length !== 7) {
    console.warn('colorUtils: Invalid background color provided');
    return '#000000';
  }
  
  try {
    // המרת צבע HEX ל-RGB
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    
    // חישוב בהירות לפי נוסחת YIQ
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    const textColor = (yiq >= 128) ? '#000000' : '#FFFFFF';
    console.log('colorUtils: Calculated contrast text color:', textColor);
    return textColor;
  } catch (error) {
    console.error('colorUtils: Error calculating contrast color:', error);
    return '#000000';
  }
};

/**
 * מחשב גרסה שקופה של צבע
 * 
 * @param {string} color - צבע בפורמט HEX
 * @param {number} opacity - ערך שקיפות בין 0 ל-1
 * @returns {string} צבע RGBA
 */
export const getTransparentColor = (color, opacity = 0.1) => {
  console.log('colorUtils: Creating transparent color:', { color, opacity });
  
  if (!color || color.length !== 7) {
    console.warn('colorUtils: Invalid color provided');
    return 'rgba(0,0,0,0.1)';
  }
  
  try {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    const rgba = `rgba(${r},${g},${b},${opacity})`;
    console.log('colorUtils: Created transparent color:', rgba);
    return rgba;
  } catch (error) {
    console.error('colorUtils: Error creating transparent color:', error);
    return 'rgba(0,0,0,0.1)';
  }
};