import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Edit, Room, Group } from '@mui/icons-material';
import { Meeting } from '../../types';
import { TEAMS, ROOMS } from '../../constants';

interface DayViewMeetingsProps {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
}

const DayViewMeetings: React.FC<DayViewMeetingsProps> = ({ meetings, onMeetingClick }) => {
  const sortedMeetings = [...meetings].sort((a, b) => 
    a.startTime.getTime() - b.startTime.getTime()
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {sortedMeetings.map((meeting) => {
        const team = TEAMS.find(t => t.id === meeting.developmentGroupId);
        const room = ROOMS.find(r => r.id === meeting.roomId);

        return (
          <Paper
            key={meeting.id}
            sx={{
              p: 2,
              '&:hover': {
                boxShadow: 3,
                cursor: 'pointer'
              }
            }}
            onClick={() => onMeetingClick(meeting)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box>
                <Typography variant="h6">{meeting.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(meeting.startTime, 'EEEE, d בMMMM', { locale: he })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(meeting.startTime, 'HH:mm')} - {format(meeting.endTime, 'HH:mm')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {team && (
                  <Chip
                    label={team.name}
                    size="small"
                    sx={{
                      backgroundColor: team.color,
                      color: 'white'
                    }}
                  />
                )}
                <Tooltip title="ערוך פגישה">
                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMeetingClick(meeting);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              {room && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Room fontSize="small" color="action" />
                  <Typography variant="body2">{room.name}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Group fontSize="small" color="action" />
                <Typography variant="body2">
                  {meeting.participants.required.length + meeting.participants.optional.length} משתתפים
                </Typography>
              </Box>
            </Box>

            {meeting.description && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {meeting.description}
              </Typography>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default DayViewMeetings; 