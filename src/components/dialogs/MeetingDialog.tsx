import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TEAMS, ROOMS } from '../../constants';

interface MeetingDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (meeting: any) => void;
  meeting?: any;
  isEditing?: boolean;
}

const MeetingDialog: React.FC<MeetingDialogProps> = ({
  open,
  onClose,
  onSave,
  meeting,
  isEditing = false
}) => {
  const [formData, setFormData] = useState({
    description: meeting?.description || '',
    developmentGroupId: meeting?.developmentGroupId || '',
    roomId: meeting?.roomId || '',
    startTime: meeting?.startTime ? new Date(meeting.startTime) : null,
    endTime: meeting?.endTime ? new Date(meeting.endTime) : null,
    details: meeting?.details || ''
  });

  const handleSave = () => {
    console.log('MeetingDialog: Saving meeting', formData);
    onSave({
      ...meeting,
      ...formData,
      id: meeting?.id || Date.now(),
      status: meeting?.status || 'pending'
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditing ? 'עריכת פגישה' : 'פגישה חדשה'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="נושא"
            fullWidth
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
          
          <FormControl fullWidth>
            <InputLabel>צוות</InputLabel>
            <Select
              value={formData.developmentGroupId}
              onChange={(e) => setFormData(prev => ({ ...prev, developmentGroupId: e.target.value }))}
            >
              {TEAMS.map(team => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>חדר</InputLabel>
            <Select
              value={formData.roomId}
              onChange={(e) => setFormData(prev => ({ ...prev, roomId: e.target.value }))}
            >
              {ROOMS.map(room => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name} ({room.capacity} משתתפים)
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DateTimePicker
            label="זמן התחלה"
            value={formData.startTime}
            onChange={(date) => setFormData(prev => ({ ...prev, startTime: date }))}
          />

          <DateTimePicker
            label="זמן סיום"
            value={formData.endTime}
            onChange={(date) => setFormData(prev => ({ ...prev, endTime: date }))}
          />

          <TextField
            label="פרטים נוספים"
            multiline
            rows={4}
            fullWidth
            value={formData.details}
            onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
          disabled={!formData.description || !formData.developmentGroupId || !formData.startTime || !formData.endTime}
        >
          {isEditing ? 'עדכן' : 'צור פגישה'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MeetingDialog; 