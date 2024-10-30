import { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import api from '../../services/api';
import Loading from '../UI/Loading';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Room as RoomIcon,
  Group as GroupIcon,
  Event as EventIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';

// סכמת ולידציה עבור טופס הפגישה
const validationSchema = yup.object({
  title: yup.string().required('נדרש תיאור לפגישה'),
  startDate: yup.date().required('נדרש תאריך התחלה'),
  endDate: yup.date().required('נדרש תאריך סיום')
    .min(yup.ref('startDate'), 'תאריך הסיום חייב להיות אחרי תאריך ההה'),
  room: yup.string().required('נדרש חדר פגישה')
});

// רשימת חדרי הפגישות
const MEETING_ROOMS = [
  'Blue Room',
  'New York Room',
  'Large Board Room'
];

// פונקציית עזר לפורמט תאריכים
const formatDateTime = (date) => {
  return format(new Date(date), 'PPpp', { locale: he });
};

// הגדרת קבוצות הפיתוח עם אייקונים
const TEAMS = [
  { id: 1, name: 'צוות UI', icon: '🎨' },
  { id: 2, name: 'צוות Mobile', icon: '📱' },
  { id: 3, name: 'צוות React', icon: '⚛️' },
  { id: 4, name: 'צוות Backend', icon: '⚙️' }
];

// הגדרת חדרים עם אייקונים
const ROOMS = [
  { id: 'blue', name: 'חדר כחול', icon: '🔷', value: 'Blue Room' },
  { id: 'ny', name: 'חדר ניו יורק', icon: '🗽', value: 'New York Room' },
  { id: 'board', name: 'חדר ישיבות גדול', icon: '🏢', value: 'Large Board Room' }
];

// פונקציית עזר למציאת שם החדר לפי מזהה
const getRoomNameById = (roomId) => {
  const room = ROOMS.find(room => room.value === roomId || room.id === roomId);
  return room ? `${room.icon} ${room.name}` : 'חדר לא ידוע';
};

// פונקציית עזר למציאת שם הקבוצה לפי מזהה
const getTeamNameById = (teamId) => {
  const team = TEAMS.find(team => team.id === teamId);
  return team ? `${team.icon} ${team.name}` : 'קבוצה לא ידועה';
};

function TeamCalendar() {
  // State declarations
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: '',
      startDate: selectedDates?.start || new Date(),
      endDate: selectedDates?.end || new Date(),
      room: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!selectedTeam) {
        Swal.fire({
          title: 'שגיאה!',
          text: 'יש לבחור קבוצת פיתוח',
          icon: 'error',
          confirmButtonText: 'סגור'
        });
        return;
      }

      try {
        const selectedRoom = ROOMS.find(room => room.id === values.room);
        const meetingData = {
          developmentGroupId: selectedTeam,
          description: values.title,
          startTime: values.startDate.toISOString(),
          endTime: values.endDate.toISOString(),
          room: selectedRoom.value
        };

        if (editingEventId) {
          await api.updateMeeting(editingEventId, meetingData);
        } else {
          await api.createMeeting(meetingData);
        }

        await fetchMeetings();
        
        Swal.fire({
          title: 'הצלחה!',
          text: editingEventId ? 'הפגישה עודכנה בהצלחה' : 'הפגישה נוצרה בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        
        handleDialogClose();
      } catch (error) {
        console.error('שגיאה בפעולת הפגישה:', error);
        Swal.fire({
          title: 'שגיאה!',
          text: 'אירעה שגיאה בשמירת הפגישה',
          icon: 'error'
        });
      }
    }
  });

  // Callbacks
  const handleDialogClose = useCallback(() => {
    setOpenDialog(false);
    setEditingEventId(null);
    formik.resetForm();
  }, [formik]);

  const handleDateSelect = (selectInfo) => {
    setSelectedDates({
      start: selectInfo.start,
      end: selectInfo.end
    });
    setOpenDialog(true);
  };

  const handleEventClick = (info) => {
    const event = info.event;
    Swal.fire({
      title: `<div class="event-title">${event.title}</div>`,
      html: `
        <div class="event-details">
          <p><i class="far fa-clock"></i> ${formatDateTime(event.start)} - ${formatDateTime(event.end)}</p>
          <p><i class="far fa-building"></i> ${getRoomNameById(event.extendedProps.room)}</p>
          <p><i class="far fa-users"></i> ${getTeamNameById(selectedTeam)}</p>
        </div>
      `,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: '<i class="fas fa-edit"></i> עריכה',
      denyButtonText: '<i class="fas fa-trash"></i> מחיקה',
      cancelButtonText: '<i class="fas fa-times"></i> סגור',
      customClass: {
        popup: 'modern-popup',
        confirmButton: 'modern-button edit-button',
        denyButton: 'modern-button delete-button',
        cancelButton: 'modern-button cancel-button',
        title: 'modern-title',
        htmlContainer: 'modern-content'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setEditingEventId(event.id);
        formik.setValues({
          title: event.title,
          startDate: new Date(event.start),
          endDate: new Date(event.end),
          room: event.extendedProps.room
        });
        setOpenDialog(true);
      } else if (result.isDenied) {
        Swal.fire({
          title: 'האם אתה בטוח?',
          text: 'לא ניתן לשחזר פגישה לאחר מחיקתה',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'כן, למחוק',
          cancelButtonText: 'ביטול',
          customClass: {
            popup: 'modern-popup',
            confirmButton: 'modern-button delete-button',
            cancelButton: 'modern-button cancel-button'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            handleDeleteMeeting(event.id);
          }
        });
      }
    });
  };

  const handleDeleteMeeting = async (id) => {
    try {
      await api.deleteMeeting(id);
      await fetchMeetings();
      Swal.fire({
        title: 'נמחק בהצלחה!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('שגיאה במחיקת פגישה:', error);
      Swal.fire({
        title: 'שגיאה!',
        text: 'אירעה שגיאה במחיקת הפגישה',
        icon: 'error'
      });
    }
  };

  // הגדרת fetchMeetings כ-callback
  const fetchMeetings = useCallback(async () => {
    if (!selectedTeam) return;
    try {
      console.log('Fetching meetings for team:', selectedTeam);
      const meetings = await api.getMeetings(selectedTeam);
      console.log('Received meetings:', meetings);
      
      const formattedMeetings = meetings.map(meeting => ({
        id: meeting.id,
        title: meeting.description,
        start: new Date(meeting.start_time),
        end: new Date(meeting.end_time),
        extendedProps: {
          room: meeting.room
        }
      }));
      
      console.log('Formatted meetings:', formattedMeetings);
      setMeetings(formattedMeetings);
    } catch (error) {
      console.error('שגיאה בטעינת פגישות:', error);
      Swal.fire({
        title: 'שגיאה!',
        text: 'אירעה שגיאה בטעינת הפגישות',
        icon: 'error',
        confirmButtonText: 'סגור'
      });
    }
  }, [selectedTeam]);

  // Effects
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await api.getTeams();
        setTeams(fetchedTeams);
      } catch (error) {
        console.error('שגיאה בטעינת קבוצות:', error);
        Swal.fire({
          title: 'שגיאה!',
          text: 'אירעה שגיאה בטעינת הקבוצות',
          icon: 'error',
          confirmButtonText: 'סגור'
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  if (isLoading) {
    return <Loading message="טוען נתונים..." />;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl 
        fullWidth 
        margin="normal"
        sx={{
          maxWidth: '600px',
          alignSelf: 'center',
          '& .MuiInputLabel-root': {
            right: 16,
            left: 'auto',
            transformOrigin: 'right',
            fontSize: '1rem',
            fontFamily: 'Rubik, sans-serif'
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&:hover fieldset': {
              borderColor: theme => theme.palette.primary.main,
            }
          },
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '12px 16px'
          }
        }}
      >
        <InputLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GroupIcon fontSize="small" />
            <span>קבוצת פיתוח</span>
          </Box>
        </InputLabel>
        <Select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          required
        >
          {TEAMS.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{team.icon}</span>
                <span>{team.name}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ 
        flex: 1,
        '.fc': {
          height: '100%',
          minHeight: { xs: '400px', sm: '600px' }
        },
        '.fc-toolbar': {
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        },
        '.fc-toolbar-chunk': {
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        },
        '.fc-header-toolbar': {
          mb: { xs: 1, sm: 3 }
        },
        '.fc-view': {
          overflow: 'auto'
        },
        '.fc-daygrid-event': {
          whiteSpace: 'normal',
          overflow: 'hidden',
          display: 'block',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          backgroundColor: theme => theme.palette.primary.light,
          borderColor: theme => theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme => theme.palette.primary.main,
            cursor: 'pointer'
          }
        },
        '.fc-timegrid-event': {
          backgroundColor: theme => theme.palette.primary.light,
          borderColor: theme => theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme => theme.palette.primary.main,
            cursor: 'pointer'
          }
        }
      }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' }
            },
            timeGridWeek: {
              titleFormat: { year: 'numeric', month: 'long', day: '2-digit' }
            },
            timeGridDay: {
              titleFormat: { year: 'numeric', month: 'long', day: '2-digit' }
            }
          }}
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          eventContent={(eventInfo) => (
            <Box sx={{ 
              p: 0.5,
              overflow: 'hidden',
              width: '100%',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              <Typography variant="subtitle2" noWrap>
                {eventInfo.event.title}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block' }} noWrap>
                {eventInfo.event.extendedProps.room}
              </Typography>
            </Box>
          )}
          events={meetings}
          locale="he"
          direction="rtl"
          selectable={true}
          selectMirror={true}
          dayMaxEventRows={3}
          moreLinkText="עוד"
          moreLinkClick="popover"
          eventDisplay="block"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            width: {
              xs: '95%',
              sm: '80%',
              md: '60%'
            },
            maxWidth: '600px',
            m: { xs: 1, sm: 2 },
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {editingEventId ? 'עריכת פגישה' : 'הוספת פגישה חדשה'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="תיאור הפגישה"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            
            <DateTimePicker
              label="זמן התחלה"
              value={formik.values.startDate}
              onChange={(value) => formik.setFieldValue('startDate', value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                  error: formik.touched.startDate && Boolean(formik.errors.startDate),
                  helperText: formik.touched.startDate && formik.errors.startDate
                }
              }}
            />
            
            <DateTimePicker
              label="זמן סיום"
              value={formik.values.endDate}
              onChange={(value) => formik.setFieldValue('endDate', value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                  error: formik.touched.endDate && Boolean(formik.errors.endDate),
                  helperText: formik.touched.endDate && formik.errors.endDate
                }
              }}
            />
            
            <FormControl 
              fullWidth 
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': {
                  right: 16,
                  left: 'auto',
                  transformOrigin: 'right',
                  fontSize: '1rem',
                  fontFamily: 'Rubik, sans-serif'
                }
              }}
            >
              <InputLabel>חדר</InputLabel>
              <Select
                name="room"
                value={formik.values.room}
                onChange={formik.handleChange}
                error={formik.touched.room && Boolean(formik.errors.room)}
              >
                {ROOMS.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{room.icon}</span>
                      <span>{room.name}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>ביטול</Button>
            <Button type="submit" variant="contained" color="primary">
              שמירה
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default TeamCalendar;