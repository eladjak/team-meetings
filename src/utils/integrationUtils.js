/**
 * פונקציות עזר לאינטגרציה עם שירותים חיצוניים
 * כולל Google Calendar, Outlook ו-Slack
 * 
 * @module integrationUtils
 */

/**
 * ייצוא פגישה ל-Google Calendar
 * @param {Object} meeting - פרטי הפגישה
 * @returns {string} קישור להוספת האירוע ל-Google Calendar
 */
export const exportToGoogleCalendar = (meeting) => {
  console.log('integrationUtils: Exporting to Google Calendar:', meeting);

  try {
    const startTime = new Date(meeting.startTime).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = new Date(meeting.endTime).toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const params = {
      action: 'TEMPLATE',
      text: meeting.description,
      dates: `${startTime}/${endTime}`,
      location: meeting.room,
      details: `משתתפים: ${meeting.participants.join(', ')}\n\nסטטוס: ${meeting.status}`
    };

    const url = `https://calendar.google.com/calendar/render?${new URLSearchParams(params)}`;
    console.log('integrationUtils: Generated Google Calendar URL:', url);
    return url;
  } catch (error) {
    console.error('integrationUtils: Error exporting to Google Calendar:', error);
    throw new Error('Failed to generate Google Calendar link');
  }
};

/**
 * ייצוא פגישה ל-Outlook
 * @param {Object} meeting - פרטי הפגישה
 * @returns {string} קישור להוספת האירוע ל-Outlook
 */
export const exportToOutlook = (meeting) => {
  console.log('integrationUtils: Exporting to Outlook:', meeting);

  try {
    const startTime = new Date(meeting.startTime).toISOString();
    const endTime = new Date(meeting.endTime).toISOString();
    
    const params = {
      subject: meeting.description,
      startdt: startTime,
      enddt: endTime,
      location: meeting.room,
      body: `משתתפים: ${meeting.participants.join(', ')}\n\nסטטוס: ${meeting.status}`
    };

    const url = `https://outlook.office.com/calendar/0/deeplink/compose?${new URLSearchParams(params)}`;
    console.log('integrationUtils: Generated Outlook URL:', url);
    return url;
  } catch (error) {
    console.error('integrationUtils: Error exporting to Outlook:', error);
    throw new Error('Failed to generate Outlook link');
  }
};

/**
 * שליחת התראה ל-Slack
 * @param {Object} meeting - פרטי הפגישה
 * @param {string} webhookUrl - כתובת ה-webhook של Slack
 * @returns {Promise} תוצאת השליחה
 */
export const sendSlackNotification = async (meeting, webhookUrl) => {
  console.log('integrationUtils: Sending Slack notification:', meeting);

  try {
    const message = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `📅 ${meeting.description}`
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*מתי:*\n${new Date(meeting.startTime).toLocaleString('he-IL')}`
            },
            {
              type: 'mrkdwn',
              text: `*איפה:*\n${meeting.room}`
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*משתתפים:*\n${meeting.participants.join(', ')}`
          }
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error(`Slack API returned ${response.status}`);
    }

    console.log('integrationUtils: Slack notification sent successfully');
    return true;
  } catch (error) {
    console.error('integrationUtils: Error sending Slack notification:', error);
    throw new Error('Failed to send Slack notification');
  }
};

/**
 * יצירת קישור לפגישת Teams
 * @param {Object} meeting - פרטי הפגישה
 * @returns {Promise<string>} קישור לפגישה
 */
export const createTeamsMeeting = async (meeting) => {
  console.log('integrationUtils: Creating Teams meeting:', meeting);

  try {
    // כאן תהיה האינטגרציה האמיתית עם Microsoft Graph API
    const meetingUrl = `https://teams.microsoft.com/l/meetup-join/dummy-meeting-id`;
    console.log('integrationUtils: Generated Teams meeting URL:', meetingUrl);
    return meetingUrl;
  } catch (error) {
    console.error('integrationUtils: Error creating Teams meeting:', error);
    throw new Error('Failed to create Teams meeting');
  }
}; 