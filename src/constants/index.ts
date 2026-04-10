import { addDays, setHours, setMinutes } from 'date-fns';
import { Meeting, Team, Room } from '../types';

// Import and re-export specific constants
import { PARTICIPANTS, MEETING_TYPES } from './resources';
import { MEETING_STATUSES } from '../types/meetings';
import { TEAMS } from './teams';
import { ROOMS } from './rooms';

// Export all constants
export {
  PARTICIPANTS,
  MEETING_TYPES,
  MEETING_STATUSES,
  TEAMS,
  ROOMS
};

// Export mock data separately to avoid circular dependencies
export { MOCK_MEETINGS } from './meetings';