import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { Meeting } from '../../types/meetings';
import MeetingDialog from './MeetingDialog';

interface MeetingManagementProps {
  meetings: Meeting[];
  onAddMeeting: () => void;
  onEditMeeting: (meeting: Meeting) => void;
  onDeleteMeeting: (meetingId: number) => void;
  onManageResources: () => void;
}

const MeetingManagement: React.FC<MeetingManagementProps> = ({
  meetings,
  onAddMeeting,
  onEditMeeting,
  onDeleteMeeting,
  onManageResources
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          ניהול פגישות
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="הוסף פגישה חדשה">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onAddMeeting}
            >
              פגישה חדשה
            </Button>
          </Tooltip>
          <Tooltip title="ניהול משאבים">
            <IconButton onClick={onManageResources} color="primary">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {meetings.map((meeting) => (
          <Paper
            key={meeting.id}
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EventIcon color="action" />
              <Box>
                <Typography variant="subtitle1">{meeting.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(meeting.startTime).toLocaleString('he-IL')}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="ערוך פגישה">
                <IconButton
                  size="small"
                  onClick={() => onEditMeeting(meeting)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="מחק פגישה">
                <IconButton
                  size="small"
                  onClick={() => onDeleteMeeting(meeting.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default MeetingManagement; 