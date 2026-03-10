import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { TEAMS, ROOMS, Team, Room } from '../../constants';

interface AdvancedSearchProps {
  open: boolean;
  onClose: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ open, onClose }) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    teams: [] as number[],
    rooms: [] as number[],
    startDate: null as Date | null,
    endDate: null as Date | null,
    status: ''
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>חיפוש מתקדם</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="חיפוש חופשי"
            fullWidth
            value={searchParams.query}
            onChange={(e) => setSearchParams(prev => ({ ...prev, query: e.target.value }))}
          />

          <Autocomplete<Team, true>
            multiple
            options={TEAMS}
            getOptionLabel={(option: Team) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="צוותים" />
            )}
            onChange={(_, value) => setSearchParams(prev => ({ 
              ...prev, 
              teams: value.map(team => team.id)
            }))}
          />

          <Autocomplete<Room, true>
            multiple
            options={ROOMS}
            getOptionLabel={(option: Room) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="חדרים" />
            )}
            onChange={(_, value) => setSearchParams(prev => ({ 
              ...prev, 
              rooms: value.map(room => room.id)
            }))}
          />

          <FormControl fullWidth>
            <InputLabel>סטטוס</InputLabel>
            <Select
              value={searchParams.status}
              onChange={(e) => setSearchParams(prev => ({ ...prev, status: e.target.value }))}
            >
              <MenuItem value="">הכל</MenuItem>
              <MenuItem value="confirmed">מאושר</MenuItem>
              <MenuItem value="pending">ממתין לאישור</MenuItem>
              <MenuItem value="cancelled">בוטל</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button variant="contained" color="primary" onClick={() => {
          console.log('Searching:', searchParams);
          onClose();
        }}>
          חיפוש
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedSearch;