/**
 * שירות ניהול משתתפים בפגישות
 * מטפל בהזמנות, אישורים ועדכונים למשתתפים
 * 
 * @module participantService
 */

import logger from '../utils/logger';
import notificationService from './notificationService';
import { executeQuery, executeTransaction } from '../config/database';

class ParticipantService {
  /**
   * הוספת משתתפים לפגישה
   * @param {number} meetingId - מזהה הפגישה
   * @param {Array} participants - רשימת משתתפים להוספה
   */
  async addParticipants(meetingId, participants) {
    logger.info('ParticipantService: Adding participants', { meetingId, participants });

    try {
      await executeTransaction(async (connection) => {
        // הוספת המשתתפים לבסיס הנתונים
        for (const userId of participants) {
          await connection.execute(`
            INSERT IGNORE INTO meeting_participants (meeting_id, user_id)
            VALUES (?, ?)
          `, [meetingId, userId]);

          // שליחת התראה למשתתף
          await this.sendInvitation(meetingId, userId);
        }
      });

      logger.info('ParticipantService: Participants added successfully');
    } catch (error) {
      logger.error('ParticipantService: Error adding participants', { error });
      throw error;
    }
  }

  /**
   * הסרת משתתפים מפגישה
   * @param {number} meetingId - מזהה הפגישה
   * @param {Array} participants - רשימת משתתפים להסרה
   */
  async removeParticipants(meetingId, participants) {
    logger.info('ParticipantService: Removing participants', { meetingId, participants });

    try {
      await executeQuery(`
        DELETE FROM meeting_participants 
        WHERE meeting_id = ? AND user_id IN (?)
      `, [meetingId, participants]);

      // שליחת התראה על הסרה מהפגישה
      for (const userId of participants) {
        await this.sendRemovalNotification(meetingId, userId);
      }

      logger.info('ParticipantService: Participants removed successfully');
    } catch (error) {
      logger.error('ParticipantService: Error removing participants', { error });
      throw error;
    }
  }

  /**
   * עדכון סטטוס השתתפות
   * @param {number} meetingId - מזהה הפגישה
   * @param {number} userId - מזהה המשתמש
   * @param {string} status - סטטוס חדש
   */
  async updateParticipantStatus(meetingId, userId, status) {
    logger.info('ParticipantService: Updating participant status', { meetingId, userId, status });

    try {
      await executeQuery(`
        UPDATE meeting_participants 
        SET status = ? 
        WHERE meeting_id = ? AND user_id = ?
      `, [status, meetingId, userId]);

      // שליחת התראה על עדכון סטטוס
      await this.sendStatusUpdateNotification(meetingId, userId, status);

      logger.info('ParticipantService: Status updated successfully');
    } catch (error) {
      logger.error('ParticipantService: Error updating status', { error });
      throw error;
    }
  }

  /**
   * שליחת הזמנה למשתתף
   * @private
   */
  async sendInvitation(meetingId, userId) {
    logger.debug('ParticipantService: Sending invitation', { meetingId, userId });

    const meeting = await this.getMeetingDetails(meetingId);
    const user = await this.getUserDetails(userId);

    await notificationService.notify({
      userId,
      type: 'meeting_invitation',
      title: 'הזמנה לפגישה חדשה',
      message: `הוזמנת לפגישה: ${meeting.description}`,
      data: { meetingId },
      sendEmail: true
    });
  }

  /**
   * שליחת התראה על הסרה מפגישה
   * @private
   */
  async sendRemovalNotification(meetingId, userId) {
    logger.debug('ParticipantService: Sending removal notification', { meetingId, userId });

    const meeting = await this.getMeetingDetails(meetingId);

    await notificationService.notify({
      userId,
      type: 'meeting_removal',
      title: 'הסרה מפגישה',
      message: `הוסרת מהפגישה: ${meeting.description}`,
      data: { meetingId }
    });
  }

  /**
   * שליחת התראה על עדכון סטטוס
   * @private
   */
  async sendStatusUpdateNotification(meetingId, userId, status) {
    logger.debug('ParticipantService: Sending status update notification', { meetingId, userId, status });

    const meeting = await this.getMeetingDetails(meetingId);
    const statusText = this.getStatusText(status);

    await notificationService.notify({
      userId,
      type: 'status_update',
      title: 'עדכון סטטוס השתתפות',
      message: `סטטוס ההשתתפות שלך בפגישה ${meeting.description} עודכן ל${statusText}`,
      data: { meetingId, status }
    });
  }

  /**
   * קבלת פרטי פגישה
   * @private
   */
  async getMeetingDetails(meetingId) {
    const [meeting] = await executeQuery(
      'SELECT * FROM meetings WHERE id = ?',
      [meetingId]
    );
    return meeting;
  }

  /**
   * קבלת פרטי משתמש
   * @private
   */
  async getUserDetails(userId) {
    const [user] = await executeQuery(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    return user;
  }

  /**
   * המרת סטטוס לטקסט
   * @private
   */
  getStatusText(status) {
    const statusMap = {
      accepted: 'אושר',
      pending: 'ממתין',
      declined: 'נדחה'
    };
    return statusMap[status] || status;
  }
}

export default new ParticipantService();