import { Room, Team, Participant, Equipment } from '../types';

// ציוד אפשרי לחדרים
export const EQUIPMENT: Equipment[] = [
  { id: 1, name: 'מקרן', icon: 'Projector' },
  { id: 2, name: 'מסך חכם', icon: 'SmartScreen' },
  { id: 3, name: 'מערכת שמע', icon: 'Audio' },
  { id: 4, name: 'מצלמת ועידה', icon: 'Camera' },
  { id: 5, name: 'לוח מחיק', icon: 'Whiteboard' },
  { id: 6, name: 'מערכת הקלטה', icon: 'Recording' },
  { id: 7, name: 'מיקרופונים אלחוטיים', icon: 'Microphone' },
  { id: 8, name: 'מערכת מיזוג', icon: 'AC' }
];

// חדרים
export const ROOMS: Room[] = [
  {
    id: 1,
    name: 'חדר הרצל',
    capacity: 20,
    floor: 1,
    equipment: [1, 2, 3, 4, 5],
    features: ['נגישות מלאה', 'תאורה טבעית'],
    availability: 'available',
    location: 'אגף מערב'
  },
  {
    id: 2,
    name: 'חדר בן גוריון',
    capacity: 12,
    floor: 2,
    equipment: [1, 3, 5],
    features: ['שולחן עגול', 'קירות כתיבה'],
    availability: 'available',
    location: 'אגף מזרח'
  },
  // ... עוד 8 חדרים
];

// צוותים
export const TEAMS: Team[] = [
  {
    id: 1,
    name: 'צוות UI/UX',
    color: '#FF4081',
    leader: 1, // ID of team leader
    description: 'עיצוב ופיתוח ממשק משתמש',
    department: 'פיתוח',
    members: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    name: 'צוות Mobile',
    color: '#7C4DFF',
    leader: 6,
    description: 'פיתוח אפליקציות מובייל',
    department: 'פיתוח',
    members: [6, 7, 8]
  },
  // ... עוד 6 צוותים
];

// משתתפים
export const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: 'דני כהן',
    email: 'dani@company.com',
    role: 'מעצב UX ראשי',
    teamId: 1,
    phone: '054-1234567',
    preferences: {
      notifications: ['email', 'slack'],
      workHours: { start: '09:00', end: '18:00' }
    }
  },
  // ... עוד 30 משתתפים
];

// סטטוסי פגישות
export const MEETING_STATUSES = {
  draft: 'טיוטה',
  pending: 'ממתין לאישור',
  confirmed: 'מאושר',
  cancelled: 'בוטל',
  completed: 'הושלם',
  rescheduled: 'נדחה'
} as const;

// סוגי פגישות
export const MEETING_TYPES = {
  team: 'פגישת צוות',
  planning: 'תכנון',
  review: 'סקירה',
  training: 'הדרכה',
  client: 'פגישת לקוח',
  other: 'אחר'
} as const;

export const MOCK_MEETINGS = [
  {
    id: 1,
    title: 'פגישת צוות UI שבועית',
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 0),
    teamId: 1,
    roomId: 1,
    status: 'confirmed',
    description: 'סקירת התקדמות ותכנון משימות'
  },
  {
    id: 2,
    title: 'פגישת תכנון ספרינט',
    start: new Date(2024, 2, 16, 9, 0),
    end: new Date(2024, 2, 16, 12, 0),
    teamId: 2,
    roomId: 2,
    status: 'pending',
    description: 'תכנון ספרינט הבא'
  },
  // ... עוד פגישות לדוגמה
];

export interface Meeting {
  id: number;
  title: string;
  start: Date;
  end: Date;
  teamId: number;
  roomId: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  description: string;
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
  equipment: string[];
} 