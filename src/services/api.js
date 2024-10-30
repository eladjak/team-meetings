import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// יצירת מופע axios עם הגדרות בסיסיות
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// פונקציות שירות עבור קריאות ה-API
const api = {
  // קבלת כל קבוצות הפיתוח
  getTeams: async () => {
    const response = await axiosInstance.get('/development-groups');
    return response.data;
  },

  // קבלת פגישות לפי קבוצה
  getMeetings: async (teamId) => {
    const response = await axiosInstance.get(`/meetings/${teamId}`);
    return response.data;
  },

  // יצירת פגישה חדשה
  createMeeting: async (meetingData) => {
    const response = await axiosInstance.post('/meetings', meetingData);
    return response.data;
  },

  // עדכון פגישה
  updateMeeting: async (id, meetingData) => {
    const response = await axiosInstance.put(`/meetings/${id}`, meetingData);
    return response.data;
  },

  // מחיקת פגישה
  deleteMeeting: async (id) => {
    const response = await axiosInstance.delete(`/meetings/${id}`);
    return response.data;
  }
};

export default api; 