export interface Team {
  id: number;
  name: string;
  color: string;
  icon: string;
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
  equipment: string[];
}

export interface Meeting {
  id: number;
  description: string;
  startTime: Date;
  endTime: Date;
  developmentGroupId: number;
  roomId: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  details?: string;
  participants?: number[];
}

export interface MeetingDialogProps {
  open: boolean;
  onClose: () => void;
  meeting?: Meeting | null;
  onSave: (meeting: Meeting) => void;
}

export interface ResourceManagementProps {
  view: 'calendar' | 'list' | 'kanban';
  onViewChange: (view: 'calendar' | 'list' | 'kanban') => void;
  selectedTeams: number[];
  onTeamsChange: (teams: number[]) => void;
  selectedRooms: number[];
  onRoomsChange: (rooms: number[]) => void;
} 