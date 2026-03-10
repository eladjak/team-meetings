import React, { useState } from 'react';
import {
  Box,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ViewDay,
  ViewWeek,
  ViewModule,
  Add as AddIcon
} from '@mui/icons-material';
import CalendarView from '../calendar/CalendarView';
import { TEAMS } from '../../constants';
import TeamFilter from '../calendar/TeamFilter';

const TeamCalendar: React.FC = () => {
  console.log('TeamCalendar: Rendering');
  
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'kanban'>('calendar');
  const [selectedTeams, setSelectedTeams] = useState<number[]>(() => {
    const saved = localStorage.getItem('selectedTeams');
    return saved ? JSON.parse(saved) : TEAMS.map(team => team.id);
  });

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'calendar' | 'list' | 'kanban' | null) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const handleTeamFilterChange = (teamIds: number[]) => {
    console.log('TeamCalendar: Team filter changed', teamIds);
    setSelectedTeams(teamIds);
    localStorage.setItem('selectedTeams', JSON.stringify(teamIds));
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2,
        height: 'calc(100vh - 100px)',
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        gap: 2
      }}>
        <TeamFilter 
          selectedTeams={selectedTeams}
          onChange={handleTeamFilterChange}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
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
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ height: 'calc(100% - 48px)', overflow: 'hidden' }}>
        <CalendarView selectedTeams={selectedTeams} />
      </Box>
    </Paper>
  );
};

export default TeamCalendar;