// Types
export type MeetingType = 'team' | 'planning' | 'review' | 'training' | 'client' | 'other';
export type MeetingStatus = 'draft' | 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled';
export type MeetingPriority = 'low' | 'medium' | 'high';

// Interfaces
export interface MeetingParticipants {
  required: number[];
  optional: number[];
}

export interface Meeting {
  id?: number;
  title: string;
  description: string;
  type: MeetingType;
  startTime: Date;
  endTime: Date;
  developmentGroupId: number;
  roomId: number;
  status: MeetingStatus;
  participants: MeetingParticipants;
  organizer: number;
  requiredEquipment: string[];
  metadata: {
    isPrivate: boolean;
    priority: MeetingPriority;
    tags: string[];
    estimatedDuration: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
 