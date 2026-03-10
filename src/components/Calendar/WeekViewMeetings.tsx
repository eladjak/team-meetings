import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Grid,
  Tooltip
} from '@mui/material';
import { format, startOfWeek, addDays } from 'date-fns';
import { he } from 'date-fns/locale';
import { Edit, Room, Group } from '@mui/icons-material';
import { Meeting } from '../../types';
import { TEAMS, ROOMS } from '../../constants';

interface WeekViewMeetingsProps {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
}

const WeekViewMeetings: React.FC<WeekViewMeetingsProps> = ({ meetings, onMeetingClick }) => {
  const startOfCurrentWeek = startOfWeek(new Date(), { locale: he });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const getMeetingsForDay = (date: Date) => {
    return meetings.filter(meeting => 
      format(meeting.startTime, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Grid container spacing={1} sx={{ flex: 1, overflow: 'hidden' }}>
        {weekDays.map((day, index) => (
          <Grid item xs key={index} sx={{ height: '100%' }}>
            <Paper 
              sx={{ 
                p: 1, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') 
                  ? 'action.hover' 
                  : 'background.paper'
              }}
            >
              <Typography 
                variant="subtitle2" 
                align="center"
                sx={{ 
                  pb: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  color: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ? 'primary.main'
                    : 'text.primary'
                }}
              >
                {format(day, 'EEEE', { locale: he })}
                <Typography variant="caption" display="block">
                  {format(day, 'd בMMMM', { locale: he })}
                </Typography>
              </Typography>

              <Box sx={{ 
                flex: 1, 
                overflow: 'auto',
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
                {getMeetingsForDay(day).map((meeting) => {
                  const team = TEAMS.find(t => t.id === meeting.developmentGroupId);
                  const room = ROOMS.find(r => r.id === meeting.roomId);

                  return (
                    <Paper
                      key={meeting.id}
                      sx={{
                        p: 1,
                        '&:hover': {
                          boxShadow: 2,
                          cursor: 'pointer'
                        }
                      }}
                      onClick={() => onMeetingClick(meeting)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                        <Typography variant="subtitle2" noWrap>
                          {meeting.title}
                        </Typography>
                        {team && (
                          <Chip
                            label={team.name}
                            size="small"
                            sx={{
                              backgroundColor: team.color,
                              color: 'white',
                              height: 20,
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                      </Box>

                      <Typography variant="caption" display="block" color="text.secondary">
                        {format(meeting.startTime, 'HH:mm')} - {format(meeting.endTime, 'HH:mm')}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        {room && (
                          <Tooltip title={room.name}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Room fontSize="small" color="action" sx={{ width: 16, height: 16 }} />
                            </Box>
                          </Tooltip>
                        )}
                        <Tooltip title={`${meeting.participants.required.length + meeting.participants.optional.length} משתתפים`}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Group fontSize="small" color="action" sx={{ width: 16, height: 16 }} />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeekViewMeetings; 