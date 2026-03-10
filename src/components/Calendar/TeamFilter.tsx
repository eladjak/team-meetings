import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  SelectChangeEvent,
  Chip
} from '@mui/material';
import { TEAMS } from '../../constants';

interface TeamFilterProps {
  selectedTeams: number[];
  onChange: (teamIds: number[]) => void;
}

const TeamFilter: React.FC<TeamFilterProps> = ({ selectedTeams, onChange }) => {
  console.log('TeamFilter: Rendering');

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    onChange(value);
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="team-filter-label">צוותים</InputLabel>
      <Select
        labelId="team-filter-label"
        multiple
        value={selectedTeams}
        onChange={handleChange}
        label="צוותים"
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((teamId) => {
              const team = TEAMS.find(t => t.id === teamId);
              return team ? (
                <Chip 
                  key={team.id} 
                  label={team.name}
                  size="small"
                  sx={{ 
                    backgroundColor: team.color,
                    color: 'white'
                  }}
                />
              ) : null;
            })}
          </Box>
        )}
      >
        {TEAMS.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: team.color
            }}>
              <span>{team.icon}</span>
              <span>{team.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TeamFilter; 