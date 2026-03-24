import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, IconButton, Tooltip } from '@mui/material';
import { ViewDay, ViewWeek, ViewModule, Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
      p: 2,
      bgcolor: isDark ? 'rgba(16, 16, 36, 0.85)' : 'background.paper',
      borderRadius: '14px',
      border: isDark ? '1px solid rgba(168, 85, 247, 0.18)' : '1px solid rgba(0,0,0,0.08)',
      boxShadow: isDark
        ? '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(168, 85, 247, 0.08)'
        : '0 2px 12px rgba(0,0,0,0.06)',
      backdropFilter: isDark ? 'blur(12px)' : undefined,
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
          <IconButton
            onClick={onAddClick}
            sx={{
              ...(isDark && {
                background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
                  boxShadow: '0 6px 20px rgba(168, 85, 247, 0.55)',
                  transform: 'translateY(-1px) scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }),
              ...(!isDark && { color: 'primary.main' }),
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ResourceManagement; 