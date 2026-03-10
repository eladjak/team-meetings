import React from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { Meeting } from '../../../types/meetings';
import { PARTICIPANTS, TEAMS } from '../../../constants';

interface ParticipantsTabProps {
  formData: Partial<Meeting>;
  setFormData: (data: Partial<Meeting>) => void;
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({ formData, setFormData }) => {
  const getTeamColor = (teamId: number) => {
    const team = TEAMS.find(t => t.id === teamId);
    return team?.color || '#ccc';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          משתתפים נדרשים
        </Typography>
        <Autocomplete
          multiple
          options={PARTICIPANTS}
          getOptionLabel={(option) => `${option.name} (${option.role})`}
          value={PARTICIPANTS.filter(p => formData.participants?.required.includes(p.id))}
          onChange={(_, newValue) => {
            setFormData({
              ...formData,
              participants: {
                ...formData.participants,
                required: newValue.map(v => v.id)
              }
            });
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="בחר משתתפים נדרשים" />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.name}
                avatar={<Avatar src={option.avatar} alt={option.name} />}
                sx={{
                  backgroundColor: getTeamColor(option.teamId),
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white'
                  }
                }}
              />
            ))
          }
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={option.avatar} alt={option.name} sx={{ width: 24, height: 24 }} />
                <Box>
                  <Typography>{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.role} | {TEAMS.find(t => t.id === option.teamId)?.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        />
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          משתתפים אופציונליים
        </Typography>
        <Autocomplete
          multiple
          options={PARTICIPANTS.filter(p => !formData.participants?.required.includes(p.id))}
          getOptionLabel={(option) => `${option.name} (${option.role})`}
          value={PARTICIPANTS.filter(p => formData.participants?.optional.includes(p.id))}
          onChange={(_, newValue) => {
            setFormData({
              ...formData,
              participants: {
                ...formData.participants,
                optional: newValue.map(v => v.id)
              }
            });
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="בחר משתתפים אופציונליים" />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.name}
                variant="outlined"
                avatar={<Avatar src={option.avatar} alt={option.name} />}
                sx={{
                  borderColor: getTeamColor(option.teamId),
                  color: getTeamColor(option.teamId)
                }}
              />
            ))
          }
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={option.avatar} alt={option.name} sx={{ width: 24, height: 24 }} />
                <Box>
                  <Typography>{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.role} | {TEAMS.find(t => t.id === option.teamId)?.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};

export default ParticipantsTab; 