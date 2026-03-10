/**
 * בדיקות אינטגרציה למערכת הפגישות
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../../src/context/ThemeContext';
import TeamCalendar from '../../src/components/organisms/TeamCalendar';

describe('Meeting Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates new meeting successfully', async () => {
    render(
      <ThemeProvider>
        <TeamCalendar />
      </ThemeProvider>
    );

    // לחיצה על כפתור יצירת פגישה
    fireEvent.click(screen.getByText('פגישה חדשה'));

    // מילוי טופס
    fireEvent.change(screen.getByLabelText('תיאור'), {
      target: { value: 'פגישת צוות' }
    });

    // שמירה
    fireEvent.click(screen.getByText('שמירה'));

    // בדיקה שהפגישה נוצרה
    await waitFor(() => {
      expect(screen.getByText('פגישת צוות')).toBeInTheDocument();
    });
  });
}); 