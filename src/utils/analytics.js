/**
 * שירות אנליטיקס לניטור שימוש באפליקציה
 * מאפשר מעקב אחר פעולות משתמשים ואיסוף מדדים
 * 
 * @module analytics
 */

// קבוע לשמירת אירועים בלוקל סטורג'
const ANALYTICS_STORAGE_KEY = 'calendar_analytics';

/**
 * שמירת אירוע אנליטיקס
 * @param {string} category - קטגוריית האירוע
 * @param {string} action - סוג הפעולה
 * @param {Object} data - נתונים נוספים
 */
export const trackEvent = (category, action, data = {}) => {
  console.log('Analytics: Tracking event:', { category, action, data });

  try {
    const event = {
      category,
      action,
      data,
      timestamp: new Date().toISOString()
    };

    // שמירה בלוקל סטורג'
    const events = JSON.parse(localStorage.getItem(ANALYTICS_STORAGE_KEY) || '[]');
    events.push(event);
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));

    // שליחה לשרת (בעתיד)
    sendToAnalyticsServer(event);
  } catch (error) {
    console.error('Analytics: Error tracking event:', error);
  }
};

/**
 * מעקב אחר צפייה בדף
 * @param {string} pageName - שם הדף
 * @param {Object} pageData - נתונים נוספים על הדף
 */
export const trackPageView = (pageName, pageData = {}) => {
  console.log('Analytics: Tracking page view:', { pageName, pageData });
  
  trackEvent('page_view', pageName, {
    ...pageData,
    url: window.location.href,
    referrer: document.referrer
  });
};

/**
 * מעקב אחר פעולות משתמש
 * @param {string} action - סוג הפעולה
 * @param {Object} actionData - נתונים נוספים על הפעולה
 */
export const trackUserAction = (action, actionData = {}) => {
  console.log('Analytics: Tracking user action:', { action, actionData });
  
  trackEvent('user_action', action, actionData);
};

/**
 * מעקב אחר ביצועים
 * @param {string} metric - שם המדד
 * @param {number} value - ערך המדד
 * @param {Object} metricData - נתונים נוספים על המדד
 */
export const trackPerformance = (metric, value, metricData = {}) => {
  console.log('Analytics: Tracking performance:', { metric, value, metricData });
  
  trackEvent('performance', metric, {
    value,
    ...metricData
  });
};

/**
 * מעקב אחר שגיאות
 * @param {Error} error - אובייקט השגיאה
 * @param {Object} errorContext - הקשר השגיאה
 */
export const trackError = (error, errorContext = {}) => {
  console.log('Analytics: Tracking error:', { error, errorContext });
  
  trackEvent('error', error.name, {
    message: error.message,
    stack: error.stack,
    ...errorContext
  });
};

// פונקציית עזר לשליחה לשרת
const sendToAnalyticsServer = async (event) => {
  // TODO: implement actual server communication
  console.log('Analytics: Would send to server:', event);
};

// ייצוא אובייקט מרכז
export const Analytics = {
  trackEvent,
  trackPageView,
  trackUserAction,
  trackPerformance,
  trackError
}; 