import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  Tooltip
} from '@mui/material';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Edit, Room, Group } from '@mui/icons-material';
import { Meeting } from '../../types';
import { TEAMS, ROOMS, PARTICIPANTS } from '../../constants';

interface KanbanViewMeetingsProps {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
}

const columns = [
  { id: 'pending', title: 'ממתין לאישור', color: '#f39c12' },
  { id: 'confirmed', title: 'מאושר', color: '#27ae60' },
  { id: 'cancelled', title: 'בוטל', color: '#c0392b' }
];

const KanbanViewMeetings: React.FC<KanbanViewMeetingsProps> = ({ meetings, onMeetingClick }) => {
  const getMeetingsByStatus = (status: string) => {
    return meetings.filter(meeting => meeting.status === status);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      height: '100%', 
      overflow: 'auto' 
    }}>
      {columns.map(column => (
        <Paper
          key={column.id}
          sx={{
            width: 300,
            height: '100%',
            p: 2,
            bgcolor: 'background.default'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              color: column.color,
              borderBottom: `2px solid ${column.color}`,
              pb: 1
            }}
          >
            {column.title}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1 
          }}>
            {getMeetingsByStatus(column.id).map(meeting => {
              const team = TEAMS.find(t => t.id === meeting.developmentGroupId);
              const room = ROOMS.find(r => r.id === meeting.roomId);
              const participants = meeting.participants?.required || [];

              return (
                <Card 
                  key={meeting.id}
                  sx={{
                    '&:hover': {
                      boxShadow: 3,
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => onMeetingClick(meeting)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" noWrap>
                        {meeting.title}
                      </Typography>
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
                    </Box>

                    <Typography variant="caption" color="text.secondary" display="block">
                      {format(meeting.startTime, 'EEEE, d בMMMM', { locale: he })}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {format(meeting.startTime, 'HH:mm')} - {format(meeting.endTime, 'HH:mm')}
                    </Typography>

                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      {room && (
                        <Tooltip title={room.name}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Room fontSize="small" color="action" />
                            <Typography variant="caption">{room.name}</Typography>
                          </Box>
                        </Tooltip>
                      )}
                      
                      {participants.length > 0 && (
                        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
                          {participants.map(participantId => {
                            const participant = PARTICIPANTS.find(p => p.id === participantId);
                            return participant ? (
                              <Tooltip key={participant.id} title={participant.name}>
                                <Avatar 
                                  alt={participant.name}
                                  src={`/avatars/${participant.id}.jpg`}
                                  sx={{ width: 24, height: 24 }}
                                />
                              </Tooltip>
                            ) : null;
                          })}
                        </AvatarGroup>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default KanbanViewMeetings; 