/**
 * שירות התראות מרכזי
 * מנהל את כל סוגי ההתראות במערכת: מערכת, מייל, פוש
 * 
 * @module notificationService
 */

import logger from '../utils/logger';
import { Analytics } from '../utils/analytics';

class NotificationService {
  constructor() {
    this.subscribers = new Set();
    this.notificationQueue = [];
    this.isProcessing = false;
    this.emailService = null; // יוגדר בהמשך
    this.pushService = null;  // יוגדר בהמשך
  }

  /**
   * הרשמה לקבלת התראות
   * @param {Function} callback - פונקציה שתופעל בקבלת התראה
   * @returns {Function} פונקציה לביטול ההרשמה
   */
  subscribe(callback) {
    logger.debug('NotificationService: New subscriber added');
    this.subscribers.add(callback);
    
    return () => {
      logger.debug('NotificationService: Subscriber removed');
      this.subscribers.delete(callback);
    };
  }

  /**
   * שליחת התראה
   * @param {Object} notification - פרטי ההתראה
   */
  async notify(notification) {
    logger.info('NotificationService: New notification', { notification });
    
    const enrichedNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      status: 'pending'
    };

    this.notificationQueue.push(enrichedNotification);
    Analytics.trackEvent('notification', 'created', { type: notification.type });

    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  /**
   * עיבוד תור ההתראות
   * @private
   */
  async processQueue() {
    logger.debug('NotificationService: Processing queue', { 
      queueLength: this.notificationQueue.length 
    });

    this.isProcessing = true;

    while (this.notificationQueue.length > 0) {
      const notification = this.notificationQueue.shift();
      
      try {
        // שליחה לכל המנויים
        this.subscribers.forEach(callback => callback(notification));

        // שליחת התראת מערכת
        if (notification.showSystem) {
          await this.sendSystemNotification(notification);
        }

        // שליחת מייל
        if (notification.sendEmail) {
          await this.sendEmailNotification(notification);
        }

        // שליחת התראת פוש
        if (notification.sendPush) {
          await this.sendPushNotification(notification);
        }

        notification.status = 'delivered';
        Analytics.trackEvent('notification', 'delivered', { type: notification.type });
      } catch (error) {
        logger.error('NotificationService: Error processing notification', { error, notification });
        notification.status = 'failed';
        Analytics.trackError(error, { notification });
      }
    }

    this.isProcessing = false;
  }

  /**
   * שליחת התראת מערכת
   * @private
   */
  async sendSystemNotification(notification) {
    logger.debug('NotificationService: Sending system notification', { notification });

    if ('Notification' in window && Notification.permission === 'granted') {
      const { title, message, icon } = notification;
      
      new Notification(title, {
        body: message,
        icon,
        dir: 'rtl',
        lang: 'he'
      });
    }
  }

  /**
   * שליחת התראת מייל
   * @private
   */
  async sendEmailNotification(notification) {
    logger.debug('NotificationService: Sending email notification', { notification });

    if (!this.emailService) {
      logger.warn('NotificationService: Email service not configured');
      return;
    }

    try {
      await this.emailService.send({
        to: notification.email,
        subject: notification.title,
        html: this.generateEmailTemplate(notification)
      });
    } catch (error) {
      logger.error('NotificationService: Error sending email', { error });
      throw error;
    }
  }

  /**
   * שליחת התראת פוש
   * @private
   */
  async sendPushNotification(notification) {
    logger.debug('NotificationService: Sending push notification', { notification });

    if (!this.pushService) {
      logger.warn('NotificationService: Push service not configured');
      return;
    }

    try {
      await this.pushService.send({
        userId: notification.userId,
        title: notification.title,
        body: notification.message,
        data: notification.data
      });
    } catch (error) {
      logger.error('NotificationService: Error sending push notification', { error });
      throw error;
    }
  }

  /**
   * יצירת תבנית מייל
   * @private
   */
  generateEmailTemplate(notification) {
    return `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>${notification.title}</h2>
        <p>${notification.message}</p>
        ${notification.actionUrl ? `
          <a href="${notification.actionUrl}" 
             style="background: #1976d2; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 4px;">
            ${notification.actionText || 'לפרטים נוספים'}
          </a>
        ` : ''}
      </div>
    `;
  }
}

export default new NotificationService();