/**
 * בדיקות אינטגרציה לפגישות
 * בודק את כל תהליכי העבודה עם פגישות מקצה לקצה
 * 
 * @module meetings.test
 */

import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import TeamCalendar from '../../components/organisms/TeamCalendar';
import MeetingDialog from '../../components/calendar/MeetingDialog';
import { NotificationProvider } from '../../context/NotificationContext';
import { mockMeetings } from '../../data/mockMeetings';

describe('Meetings Integration Tests', () => {
  beforeEach(() => {
    // Reset mocks and storage
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should create new meeting and show in calendar', async () => {
    const { getByText, getByRole } = render(
      <NotificationProvider>
        <TeamCalendar />
      </NotificationProvider>
    );

    // פתיחת דיאלוג יצירת פגישה
    fireEvent.click(getByText('פגישה חדשה'));

    // מילוי פרטי הפגישה
    const dialog = getByRole('dialog');
    fireEvent.change(getByRole('textbox', { name: /תיאור/i }), {
      target: { value: 'פגישת צוות חדשה' }
    });

    // שמירת הפגישה
    await act(async () => {
      fireEvent.click(getByText('שמירה'));
    });

    // וידוא שהפגישה מופיעה בלוח
    await waitFor(() => {
      expect(getByText('פגישת צוות חדשה')).toBeInTheDocument();
    });

    // בדיקת התראה
    expect(getByText(/הפגישה נוצרה בהצלחה/i)).toBeInTheDocument();
  });

  test('should handle meeting conflicts correctly', async () => {
    // ... המשך הבדיקות
  });
}); 