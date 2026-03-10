export const MEETING_TYPES = {
  TEAM: 'team',
  PLANNING: 'planning',
  REVIEW: 'review',
  TRAINING: 'training',
  CLIENT: 'client',
  OTHER: 'other'
} as const;

export const MEETING_STATUSES = {
  DRAFT: 'draft',
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  RESCHEDULED: 'rescheduled'
} as const;

export type MeetingType = (typeof MEETING_TYPES)[keyof typeof MEETING_TYPES];
export type MeetingStatus = (typeof MEETING_STATUSES)[keyof typeof MEETING_STATUSES];

export interface Participant {
  id: number;
  name: string;
  email: string;
  role: string;
  teamId: number;
  phone: string;
  preferences: {
    notifications: string[];
    workHours: {
      start: string;
      end: string;
    };
  };
}

export interface MeetingNotification {
  type: 'email' | 'slack' | 'sms';
  timing: number; // minutes before meeting
  recipients: number[];
  message?: string;
}

export interface Meeting {
  id: number;
  title: string;
  description: string;
  type: MeetingType;
  startTime: Date;
  endTime: Date;
  developmentGroupId: number;
  roomId: number;
  status: MeetingStatus;
  participants: {
    required: number[];
    optional: number[];
  };
  organizer: number;
  requiredEquipment: string[];
  notifications: {
    type: 'email' | 'slack' | 'sms';
    timing: number;
    recipients: number[];
  }[];
  metadata: {
    isPrivate: boolean;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    estimatedDuration: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingDialogProps {
  open: boolean;
  onClose: () => void;
  meeting: Meeting | null;
  onSave: (meeting: Meeting) => void;
  onDelete?: (meetingId: number) => void;
} 