/**
 * שירות לניהול אינטגרציות עם לוחות שנה חיצוניים
 * תומך ב-Google Calendar, Outlook ו-iCal
 * 
 * @module calendarIntegrationService
 */

import logger from '../utils/logger';
import { Analytics } from '../utils/analytics';

class CalendarIntegrationService {
  constructor() {
    this.googleAuth = null;
    this.outlookAuth = null;
  }

  /**
   * ייצוא פגישה ללוח שנה חיצוני
   * @param {Object} meeting - פרטי הפגישה
   * @param {string} calendarType - סוג לוח השנה (google/outlook/ical)
   */
  async exportMeeting(meeting, calendarType) {
    logger.info('CalendarIntegration: Exporting meeting', { meeting, calendarType });

    try {
      switch (calendarType) {
        case 'google':
          return await this.exportToGoogle(meeting);
        case 'outlook':
          return await this.exportToOutlook(meeting);
        case 'ical':
          return this.exportToICal(meeting);
        default:
          throw new Error(`Unsupported calendar type: ${calendarType}`);
      }
    } catch (error) {
      logger.error('CalendarIntegration: Export failed', { error, meeting });
      throw error;
    }
  }

  /**
   * ייצוא ל-Google Calendar
   * @param {Object} meeting - פרטי הפגישה
   */
  async exportToGoogle(meeting) {
    logger.info('CalendarIntegration: Exporting to Google', { meeting });

    const event = {
      summary: meeting.description,
      location: meeting.room,
      description: `משתתפים: ${meeting.participants.join(', ')}\nסטטוס: ${meeting.status}`,
      start: {
        dateTime: meeting.startTime,
        timeZone: 'Asia/Jerusalem'
      },
      end: {
        dateTime: meeting.endTime,
        timeZone: 'Asia/Jerusalem'
      },
      attendees: meeting.participants.map(email => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 15 }
        ]
      }
    };

    Analytics.trackEvent('calendar_integration', 'export_to_google');
    return event;
  }

  /**
   * ייצוא ל-Outlook
   * @param {Object} meeting - פרטי הפגישה
   */
  async exportToOutlook(meeting) {
    logger.info('CalendarIntegration: Exporting to Outlook', { meeting });

    const event = {
      subject: meeting.description,
      start: {
        dateTime: meeting.startTime,
        timeZone: 'Asia/Jerusalem'
      },
      end: {
        dateTime: meeting.endTime,
        timeZone: 'Asia/Jerusalem'
      },
      location: { displayName: meeting.room },
      attendees: meeting.participants.map(email => ({
        emailAddress: { address: email },
        type: 'required'
      })),
      body: {
        contentType: 'HTML',
        content: `<p>משתתפים: ${meeting.participants.join(', ')}</p><p>סטטוס: ${meeting.status}</p>`
      }
    };

    Analytics.trackEvent('calendar_integration', 'export_to_outlook');
    return event;
  }

  /**
   * ייצוא ל-iCal
   * @param {Object} meeting - פרטי הפגישה
   */
  exportToICal(meeting) {
    logger.info('CalendarIntegration: Exporting to iCal', { meeting });

    const formatDate = (date) => {
      return date.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(meeting.startTime)}`,
      `DTEND:${formatDate(meeting.endTime)}`,
      `SUMMARY:${meeting.description}`,
      `LOCATION:${meeting.room}`,
      `DESCRIPTION:משתתפים: ${meeting.participants.join(', ')}\\nסטטוס: ${meeting.status}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    Analytics.trackEvent('calendar_integration', 'export_to_ical');
    return event;
  }
}

export default new CalendarIntegrationService(); 