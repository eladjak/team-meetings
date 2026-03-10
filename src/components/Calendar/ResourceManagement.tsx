import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, IconButton, Tooltip } from '@mui/material';
import { ViewDay, ViewWeek, ViewModule, Add } from '@mui/icons-material';
import TeamFilter from './TeamFilter';
import RoomFilter from './RoomFilter';

interface ResourceManagementProps {
  view: 'calendar' | 'list' | 'kanban';
  onViewChange: (view: 'calendar' | 'list' | 'kanban') => void;
  selectedTeams: number[];
  onTeamsChange: (teams: number[]) => void;
  selectedRooms: number[];
  onRoomsChange: (rooms: number[]) => void;
  onAddClick: () => void;
}

const ResourceManagement: React.FC<ResourceManagementProps> = ({
  view,
  onViewChange,
  selectedTeams,
  onTeamsChange,
  selectedRooms,
  onRoomsChange,
  onAddClick
}) => {
  console.log('ResourceManagement: Rendering', { view, selectedTeams, selectedRooms });

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
      p: 2,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, flexWrap: 'wrap' }}>
        <TeamFilter 
          selectedTeams={selectedTeams}
          onChange={onTeamsChange}
        />
        <RoomFilter
          selectedRooms={selectedRooms}
          onChange={onRoomsChange}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, newView) => newView && onViewChange(newView)}
          size="small"
        >
          <ToggleButton value="calendar">
            <Tooltip title="תצוגת לוח שנה">
              <ViewDay />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="list">
            <Tooltip title="תצוגת רשימה">
              <ViewWeek />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="kanban">
            <Tooltip title="תצוגת קנבן">
              <ViewModule />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>

        <Tooltip title="הוסף פגישה חדשה">
          <IconButton color="primary" onClick={onAddClick}>
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ResourceManagement; 