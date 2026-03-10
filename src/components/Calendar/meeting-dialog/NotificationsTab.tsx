import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Chip,
  Button
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Meeting, MeetingNotification } from '../../../types/meetings';

interface NotificationsTabProps {
  formData: Partial<Meeting>;
  setFormData: (data: Partial<Meeting>) => void;
}

const NOTIFICATION_TIMES = [
  { value: 5, label: '5 דקות לפני' },
  { value: 10, label: '10 דקות לפני' },
  { value: 15, label: '15 דקות לפני' },
  { value: 30, label: '30 דקות לפני' },
  { value: 60, label: 'שעה לפני' },
  { value: 120, label: 'שעתיים לפני' },
  { value: 1440, label: 'יום לפני' }
];

const NOTIFICATION_TYPES = [
  { value: 'email', label: 'דוא״ל' },
  { value: 'slack', label: 'סלאק' },
  { value: 'sms', label: 'SMS' }
];

const NotificationsTab: React.FC<NotificationsTabProps> = ({ formData, setFormData }) => {
  const addNotification = () => {
    const newNotification: MeetingNotification = {
      type: 'email',
      timing: 30,
      recipients: formData.participants?.required || []
    };

    setFormData({
      ...formData,
      notifications: [...(formData.notifications || []), newNotification]
    });
  };

  const removeNotification = (index: number) => {
    setFormData({
      ...formData,
      notifications: formData.notifications?.filter((_, i) => i !== index)
    });
  };

  const updateNotification = (index: number, updates: Partial<MeetingNotification>) => {
    setFormData({
      ...formData,
      notifications: formData.notifications?.map((notification, i) => 
        i === index ? { ...notification, ...updates } : notification
      )
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">התראות</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={addNotification}
          variant="outlined"
          size="small"
        >
          הוסף התראה
        </Button>
      </Box>

      {formData.notifications?.map((notification, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>סוג התראה</InputLabel>
                <Select
                  value={notification.type}
                  onChange={(e) => updateNotification(index, { type: e.target.value as 'email' | 'slack' | 'sms' })}
                >
                  {NOTIFICATION_TYPES.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>זמן התראה</InputLabel>
                <Select
                  value={notification.timing}
                  onChange={(e) => updateNotification(index, { timing: e.target.value as number })}
                >
                  {NOTIFICATION_TIMES.map(time => (
                    <MenuItem key={time.value} value={time.value}>
                      {time.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={10} sm={3}>
              <Typography variant="caption" display="block" gutterBottom>
                נשלח ל:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip
                  label={`${notification.recipients.length} משתתפים`}
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={2} sm={1}>
              <IconButton 
                onClick={() => removeNotification(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default NotificationsTab; 