import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { Meeting } from '../../types';
import ResourceManagement from './ResourceManagement';
import CalendarView from './CalendarView';
import ListViewMeetings from './ListViewMeetings';
import KanbanViewMeetings from './KanbanViewMeetings';
import MeetingDialog from './MeetingDialog';
import { MOCK_MEETINGS, TEAMS, ROOMS } from '../../constants';

const MainCalendar: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resourceState, setResourceState] = useState({
    selectedTeams: TEAMS.map(team => team.id),
    selectedRooms: ROOMS.map(room => room.id),
    view: 'calendar' as const
  });

  console.log('MainCalendar: Rendering', { meetings, resourceState });

  const filteredMeetings = meetings.filter(meeting => {
    const teamMatch = resourceState.selectedTeams.includes(meeting.developmentGroupId);
    const roomMatch = resourceState.selectedRooms.includes(meeting.roomId);
    return teamMatch && roomMatch;
  });

  const handleAddMeeting = (start?: Date, end?: Date) => {
    setSelectedMeeting(null);
    setIsDialogOpen(true);
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsDialogOpen(true);
  };

  const handleSaveMeeting = (meeting: Meeting) => {
    if (selectedMeeting) {
      setMeetings(prev => prev.map(m => m.id === meeting.id ? meeting : m));
    } else {
      setMeetings(prev => [...prev, { ...meeting, id: Date.now() }]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteMeeting = (meetingId: number) => {
    setMeetings(prev => prev.filter(m => m.id !== meetingId));
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ResourceManagement
        view={resourceState.view}
        onViewChange={(view) => setResourceState(prev => ({ ...prev, view }))}
        selectedTeams={resourceState.selectedTeams}
        onTeamsChange={(teams) => setResourceState(prev => ({ ...prev, selectedTeams: teams }))}
        selectedRooms={resourceState.selectedRooms}
        onRoomsChange={(rooms) => setResourceState(prev => ({ ...prev, selectedRooms: rooms }))}
        onAddClick={handleAddMeeting}
      />

      <Paper sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
        {resourceState.view === 'calendar' && (
          <CalendarView 
            meetings={filteredMeetings}
            onMeetingClick={handleEditMeeting}
            onSlotSelect={handleAddMeeting}
          />
        )}
        {resourceState.view === 'list' && (
          <ListViewMeetings 
            meetings={filteredMeetings}
            onMeetingClick={handleEditMeeting}
            onAddClick={handleAddMeeting}
          />
        )}
        {resourceState.view === 'kanban' && (
          <KanbanViewMeetings 
            meetings={filteredMeetings}
            onMeetingClick={handleEditMeeting}
            onAddClick={handleAddMeeting}
          />
        )}
      </Paper>

      <MeetingDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        meeting={selectedMeeting}
        onSave={handleSaveMeeting}
        onDelete={handleDeleteMeeting}
      />
    </Box>
  );
};

export default MainCalendar;