import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  Close,
  Delete,
  Schedule,
  People,
  Room,
  Notifications
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Meeting } from '../../types';
import { TEAMS, ROOMS } from '../../constants';

interface MeetingDialogProps {
  open: boolean;
  onClose: () => void;
  meeting: Meeting | null;
  onSave: (meeting: Meeting) => void;
  onDelete?: (meetingId: number) => void;
}

const initialFormData: Partial<Meeting> = {
  title: '',
  description: '',
  type: 'team',
  startTime: new Date(),
  endTime: new Date(),
  developmentGroupId: TEAMS[0]?.id || 1,
  roomId: ROOMS[0]?.id || 1,
  status: 'pending',
  participants: {
    required: [],
    optional: []
  },
  organizer: 1,
  requiredEquipment: [],
  metadata: {
    isPrivate: false,
    priority: 'medium',
    tags: [],
    estimatedDuration: 60
  }
};

const MeetingDialog: React.FC<MeetingDialogProps> = ({
  open,
  onClose,
  meeting,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Partial<Meeting>>(initialFormData);

  useEffect(() => {
    if (meeting) {
      setFormData(meeting);
    } else {
      setFormData(initialFormData);
    }
  }, [meeting]);

  const handleSave = () => {
    const newMeeting: Meeting = {
      ...formData,
      id: meeting?.id || Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    } as Meeting;
    onSave(newMeeting);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md" 
      fullWidth
    >
      {/* ... שאר הקוד נשאר זהה ... */}
    </Dialog>
  );
};

export default MeetingDialog;