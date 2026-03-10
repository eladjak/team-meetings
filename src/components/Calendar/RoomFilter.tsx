import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  OutlinedInput
} from '@mui/material';
import { ROOMS } from '../../constants';

interface RoomFilterProps {
  selectedRooms: number[];
  onChange: (rooms: number[]) => void;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ selectedRooms = [], onChange }) => {
  console.log('RoomFilter: Rendering', { selectedRooms });

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const value = typeof event.target.value === 'string' 
      ? JSON.parse(event.target.value) 
      : event.target.value;
    onChange(Array.isArray(value) ? value : []);
  };

  const getSelectedRoomNames = (selected: number[]) => {
    if (!Array.isArray(selected) || selected.length === 0) {
      return 'בחר חדרים';
    }

    const names = selected
      .map(id => ROOMS.find(room => room.id === id)?.name)
      .filter(Boolean);

    return names.length > 0 ? names.join(', ') : 'בחר חדרים';
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="room-filter-label">חדרים</InputLabel>
        <Select
          labelId="room-filter-label"
          id="room-filter"
          multiple
          value={selectedRooms}
          onChange={handleChange}
          input={<OutlinedInput label="חדרים" />}
          renderValue={getSelectedRoomNames}
        >
          {ROOMS.map((room) => (
            <MenuItem key={room.id} value={room.id}>
              <Checkbox checked={selectedRooms.includes(room.id)} />
              <ListItemText 
                primary={room.name} 
                secondary={`קיבולת: ${room.capacity || 0} משתתפים`}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoomFilter; 