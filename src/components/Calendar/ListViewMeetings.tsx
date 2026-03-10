import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  IconButton,
  Box,
  Paper
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { TEAMS, MOCK_MEETINGS } from '../../constants';
import { Meeting } from '../../types';

interface ListViewMeetingsProps {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
  onAddClick: () => void;
}

const ListViewMeetings: React.FC<ListViewMeetingsProps> = ({ meetings, onMeetingClick }) => {
  console.log('ListViewMeetings: Rendering');

  return (
    <Paper elevation={0} sx={{ height: '100%', overflow: 'auto' }}>
      <List>
        {meetings.map((meeting) => {
          const team = TEAMS.find(t => t.id === meeting.developmentGroupId);
          
          return (
            <ListItem
              key={meeting.id}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
              secondaryAction={
                <Box>
                  <IconButton 
                    edge="end" 
                    aria-label="edit"
                    onClick={() => onMeetingClick(meeting)}
                  >
                    <Edit />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {meeting.description}
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
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {format(meeting.startTime, 'EEEE, d בMMMM, HH:mm', { locale: he })}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default ListViewMeetings; 