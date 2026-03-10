import React from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { he } from 'date-fns/locale';
import { Box, useTheme } from '@mui/material';
import { Meeting } from '../../types';
import { TEAMS } from '../../constants';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface CalendarViewProps {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
  onSlotSelect: (start: Date, end: Date) => void;
}

const locales = { he };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView: React.FC<CalendarViewProps> = ({ meetings, onMeetingClick, onSlotSelect }) => {
  const theme = useTheme();

  const eventStyleGetter = (event: Meeting) => {
    const team = TEAMS.find(t => t.id === event.developmentGroupId);
    return {
      style: {
        backgroundColor: team?.color || theme.palette.primary.main,
        borderRadius: '4px',
        opacity: 0.9,
        color: theme.palette.getContrastText(team?.color || theme.palette.primary.main),
        border: 'none',
        padding: '2px 5px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 500,
        boxShadow: theme.shadows[1]
      }
    };
  };

  const messages = {
    today: 'היום',
    previous: 'הקודם',
    next: 'הבא',
    month: 'חודש',
    week: 'שבוע',
    day: 'יום',
    agenda: 'סדר יום',
    date: 'תאריך',
    time: 'שעה',
    event: 'אירוע',
    allDay: 'כל היום',
    work_week: 'שבוע עבודה',
    yesterday: 'אתמול',
    tomorrow: 'מחר',
    noEventsInRange: 'אין פגישות בטווח זה',
    showMore: (total: number) => `עוד ${total} פגישות`
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 200px)',
      '& .rbc-calendar': {
        direction: 'rtl',
        fontFamily: theme.typography.fontFamily,
      },
      '& .rbc-header': {
        padding: '8px',
        fontWeight: 'bold',
        backgroundColor: theme.palette.background.paper,
      },
      '& .rbc-today': {
        backgroundColor: theme.palette.action.selected,
      },
      '& .rbc-event': {
        backgroundColor: theme.palette.primary.main,
      }
    }}>
      <Calendar
        localizer={localizer}
        events={meetings.map(meeting => ({
          ...meeting,
          title: meeting.description,
          start: new Date(meeting.startTime),
          end: new Date(meeting.endTime)
        }))}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView={Views.MONTH}
        onSelectEvent={onMeetingClick}
        onSelectSlot={({ start, end }) => onSlotSelect(start, end)}
        selectable
        popup
        eventPropGetter={eventStyleGetter}
        messages={messages}
      />
    </Box>
  );
};

export default CalendarView; 