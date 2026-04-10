import { addDays, setHours, setMinutes } from 'date-fns';
import { Meeting } from '../types';

const today = new Date();

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 1,
    title: 'סקירת עיצובים חדשים',
    description: 'סקירת עיצובים חדשים למערכת הניהול',
    type: 'review',
    startTime: setHours(setMinutes(addDays(today, 1), 0), 9),
    endTime: setHours(setMinutes(addDays(today, 1), 0), 10),
    developmentGroupId: 1,
    roomId: 1,
    status: 'confirmed',
    participants: {
      required: [1, 2, 3],
      optional: [4, 5]
    },
    organizer: 1,
    requiredEquipment: ['projector', 'screen'],
    metadata: {
      isPrivate: false,
      priority: 'high',
      tags: ['עיצוב', 'UI', 'סקירה'],
      estimatedDuration: 60
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const PARTICIPANTS = [
  { id: 1, name: 'דני כהן', teamId: 1, role: 'מעצב UX ראשי' },
  { id: 2, name: 'מיכל לוי', teamId: 1, role: 'מעצבת UI' },
  { id: 3, name: 'יוסי אברהם', teamId: 1, role: 'חוקר UX' },
  // ... עוד משתתפים
];

export const MEETING_STATUS_DISPLAY: Record<string, string> = {
  draft: 'טיוטה',
  pending: 'ממתין',
  confirmed: 'מאושר',
  cancelled: 'בוטל',
  completed: 'הושלם',
  rescheduled: 'נדחה',
} as const;