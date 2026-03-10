import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import { Meeting } from '../../../types/meetings';
import { ROOMS, EQUIPMENT } from '../../../constants';

interface ResourcesTabProps {
  formData: Partial<Meeting>;
  setFormData: (data: Partial<Meeting>) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>חדר</InputLabel>
          <Select
            value={formData.roomId || ''}
            onChange={(e) => setFormData({ ...formData, roomId: e.target.value as number })}
          >
            {ROOMS.map(room => (
              <MenuItem key={room.id} value={room.id}>
                <Box>
                  <Typography variant="subtitle1">{room.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    קיבולת: {room.capacity} משתתפים
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {room.equipment.map((eq) => (
                      <Chip
                        key={eq}
                        label={EQUIPMENT.find(e => e.id === eq)?.name}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          ציוד נדרש
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {EQUIPMENT.map(equipment => (
            <Chip
              key={equipment.id}
              label={equipment.name}
              onClick={() => {
                const newEquipment = formData.requiredEquipment?.includes(equipment.id)
                  ? formData.requiredEquipment.filter(id => id !== equipment.id)
                  : [...(formData.requiredEquipment || []), equipment.id];
                
                setFormData({
                  ...formData,
                  requiredEquipment: newEquipment
                });
              }}
              color={formData.requiredEquipment?.includes(equipment.id) ? 'primary' : 'default'}
              variant={formData.requiredEquipment?.includes(equipment.id) ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Grid>

      {formData.roomId && (
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              פרטי החדר הנבחר
            </Typography>
            {(() => {
              const room = ROOMS.find(r => r.id === formData.roomId);
              return room ? (
                <Box>
                  <Typography>מיקום: {room.location}</Typography>
                  <Typography>קומה: {room.floor}</Typography>
                  <Typography>תכונות נוספות:</Typography>
                  <Box sx={{ mt: 1 }}>
                    {room.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>
              ) : null;
            })()}
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default ResourcesTab; 