/**
 * בדיקות נגישות
 * בודק את כל פונקציונליות הנגישות באפליקציה
 * 
 * @module accessibility.test
 */

import { render, fireEvent, screen } from '@testing-library/react';
import { ACCESSIBILITY_SETTINGS } from '../utils/accessibility';
import { useAccessibility } from '../hooks/useAccessibility';
import { useAriaAnnouncer } from '../hooks/useAriaAnnouncer';

describe('Accessibility Tests', () => {
  describe('Font Size Tests', () => {
    test('should change font size correctly', () => {
      const { result } = renderHook(() => useAccessibility());
      
      act(() => {
        result.current.changeFontSize(ACCESSIBILITY_SETTINGS.FONT_SIZES.LARGE);
      });

      const html = document.documentElement;
      expect(html.style.fontSize).toBe('115%');
    });
  });

  describe('Contrast Mode Tests', () => {
    test('should apply high contrast mode', () => {
      const { result } = renderHook(() => useAccessibility());
      
      act(() => {
        result.current.toggleHighContrast();
      });

      expect(document.body.classList.contains('high-contrast')).toBe(true);
    });
  });

  describe('Keyboard Navigation Tests', () => {
    test('should navigate through calendar events with keyboard', () => {
      render(<TeamCalendar />);
      
      const firstEvent = screen.getByTestId('calendar-event-1');
      const secondEvent = screen.getByTestId('calendar-event-2');
      
      firstEvent.focus();
      fireEvent.keyDown(firstEvent, { key: 'ArrowRight' });
      
      expect(document.activeElement).toBe(secondEvent);
    });
  });

  describe('ARIA Announcer Tests', () => {
    test('should announce messages correctly', () => {
      const { result } = renderHook(() => useAriaAnnouncer());
      
      act(() => {
        result.current.announce('פגישה חדשה נוצרה בהצלחה');
      });

      const announcer = screen.getByRole('alert');
      expect(announcer).toHaveTextContent('פגישה חדשה נוצרה בהצלחה');
    });
  });

  describe('Screen Reader Tests', () => {
    test('should have proper ARIA labels on all interactive elements', () => {
      render(<MeetingDialog />);
      
      const submitButton = screen.getByRole('button', { name: /שמירה/i });
      expect(submitButton).toHaveAttribute('aria-label', 'שמירת פרטי הפגישה');
    });
  });

  describe('Motion Reduction Tests', () => {
    test('should respect reduced motion preferences', () => {
      // Simulate reduced motion preference
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }));

      const { result } = renderHook(() => useAccessibility());
      expect(result.current.reducedMotion).toBe(true);
    });
  });
}); 