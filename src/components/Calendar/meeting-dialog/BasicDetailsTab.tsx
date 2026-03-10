import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  FormControlLabel,
  Switch
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Meeting, MeetingType } from '../../../types/meetings';
import { TEAMS, MEETING_TYPES } from '../../../constants';

interface BasicDetailsTabProps {
  formData: Partial<Meeting>;
  setFormData: (data: Partial<Meeting>) => void;
}

const BasicDetailsTab: React.FC<BasicDetailsTabProps> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="נושא הפגישה"
          fullWidth
          required
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>סוג פגישה</InputLabel>
          <Select
            value={formData.type || ''}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as MeetingType })}
          >
            {Object.entries(MEETING_TYPES).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>צוות</InputLabel>
          <Select
            value={formData.developmentGroupId || ''}
            onChange={(e) => setFormData({ ...formData, developmentGroupId: e.target.value as number })}
          >
            {TEAMS.map(team => (
              <MenuItem key={team.id} value={team.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{team.icon}</span>
                  <span>{team.name}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <DateTimePicker
          label="זמן התחלה"
          value={formData.startTime || null}
          onChange={(date) => date && setFormData({ ...formData, startTime: date })}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DateTimePicker
          label="זמן סיום"
          value={formData.endTime || null}
          onChange={(date) => date && setFormData({ ...formData, endTime: date })}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="תיאור"
          multiline
          rows={4}
          fullWidth
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.metadata?.isPrivate || false}
                onChange={(e) => setFormData({
                  ...formData,
                  metadata: {
                    ...formData.metadata,
                    isPrivate: e.target.checked
                  }
                })}
              />
            }
            label="פגישה פרטית"
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>עדיפות</InputLabel>
            <Select
              value={formData.metadata?.priority || 'medium'}
              onChange={(e) => setFormData({
                ...formData,
                metadata: {
                  ...formData.metadata,
                  priority: e.target.value as 'low' | 'medium' | 'high'
                }
              })}
              size="small"
            >
              <MenuItem value="low">נמוכה</MenuItem>
              <MenuItem value="medium">בינונית</MenuItem>
              <MenuItem value="high">גבוהה</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BasicDetailsTab; 