/**
 * הוק לניהול התראות במערכת
 * מאפשר שליחת התראות למשתמש בדרכים שונות
 * 
 * @module useNotifications
 */

import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState('default');
  const [supported, setSupported] = useState(false);

  // בדיקת תמיכה בהתראות
  useEffect(() => {
    console.log('useNotifications: Checking notification support');
    
    if ('Notification' in window) {
      setSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  /**
   * בקשת הרשאה להתראות
   * @returns {Promise<boolean>} האם ההרשאה התקבלה
   */
  const requestPermission = async () => {
    console.log('useNotifications: Requesting permission');
    
    if (!supported) {
      console.warn('useNotifications: Notifications not supported');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('useNotifications: Error requesting permission:', error);
      return false;
    }
  };

  /**
   * שליחת התראה
   * @param {Object} options - אפשרויות ההתראה
   * @param {string} options.title - כותרת ההתראה
   * @param {string} options.body - תוכן ההתראה
   * @param {string} options.icon - אייקון להתראה
   * @param {Function} options.onClick - פונקציה שתופעל בלחיצה על ההתראה
   */
  const sendNotification = ({ title, body, icon, onClick }) => {
    console.log('useNotifications: Sending notification:', { title, body });
    
    if (!supported || permission !== 'granted') {
      console.warn('useNotifications: Cannot send notification - no permission');
      return;
    }

    try {
      const notification = new Notification(title, {
        body,
        icon,
        dir: 'rtl',
        lang: 'he'
      });

      if (onClick) {
        notification.onclick = () => {
          console.log('useNotifications: Notification clicked');
          onClick();
          notification.close();
        };
      }
    } catch (error) {
      console.error('useNotifications: Error sending notification:', error);
    }
  };

  /**
   * שליחת התראה על פגישה
   * @param {Object} meeting - פרטי הפגישה
   * @param {number} minutesBefore - כמה דקות לפני לשלוח את ההתראה
   */
  const scheduleMeetingNotification = (meeting, minutesBefore = 15) => {
    console.log('useNotifications: Scheduling meeting notification:', { meeting, minutesBefore });
    
    if (!supported || permission !== 'granted') {
      console.warn('useNotifications: Cannot schedule notification - no permission');
      return;
    }

    const meetingTime = new Date(meeting.startTime);
    const notificationTime = new Date(meetingTime.getTime() - minutesBefore * 60000);
    const now = new Date();

    if (notificationTime <= now) {
      console.warn('useNotifications: Cannot schedule notification in the past');
      return;
    }

    const timeoutId = setTimeout(() => {
      sendNotification({
        title: `תזכורת: ${meeting.description}`,
        body: `הפגישה מתחילה בעוד ${minutesBefore} דקות`,
        onClick: () => {
          // פתיחת הפגישה בלוח
          window.focus();
          // TODO: ניווט לפגישה בלוח
        }
      });
    }, notificationTime.getTime() - now.getTime());

    // החזרת פונקציה לביטול התזכורת
    return () => clearTimeout(timeoutId);
  };

  return {
    supported,
    permission,
    requestPermission,
    sendNotification,
    scheduleMeetingNotification
  };
}; 