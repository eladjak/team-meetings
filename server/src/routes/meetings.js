/**
 * ראוטר פגישות
 * מכיל את כל נקודות הקצה הקשורות לפגישות
 * 
 * @module meetingsRouter
 */

import express from 'express';
import Meeting from '../models/Meeting.js';
import logger from '../utils/logger.js';
import { validateMeeting } from '../middleware/validation.js';
import { checkPermissions } from '../middleware/auth.js';

const router = express.Router();

// מערך זמני לאחסון פגישות (יוחלף במסד נתונים בהמשך)
let meetings = [];

/**
 * קבלת כל הפגישות
 * GET /api/meetings
 */
router.get('/', (req, res) => {
  logger.info('Fetching all meetings');
  res.json(meetings);
});

/**
 * יצירת פגישה חדשה
 * POST /api/meetings
 */
router.post('/', (req, res) => {
  try {
    const newMeeting = new Meeting({
      id: meetings.length + 1,
      ...req.body
    });
    
    // בדיקת התנגשויות
    const hasConflict = meetings.some(meeting => newMeeting.hasConflictWith(meeting));
    if (hasConflict) {
      return res.status(409).json({ error: 'קיימת התנגשות עם פגישה אחרת' });
    }

    meetings.push(newMeeting);
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * עדכון פגישה
 * PUT /api/meetings/:id
 */
router.put('/:id',
  checkPermissions('EDIT_MEETING'),
  validateMeeting,
  async (req, res) => {
    try {
      logger.info('Meetings: Updating meeting', { id: req.params.id, body: req.body });
      
      const meeting = await Meeting.update(req.params.id, req.body);
      if (!meeting) {
        return res.status(404).json({ error: 'פגישה לא נמצאה' });
      }
      
      res.json(meeting);
    } catch (error) {
      logger.error('Meetings: Error updating meeting', { error });
      res.status(500).json({ error: 'שגיאה בעדכון הפגישה' });
    }
});

/**
 * מחיקת פגישה
 * DELETE /api/meetings/:id
 */
router.delete('/:id',
  checkPermissions('DELETE_MEETING'),
  async (req, res) => {
    try {
      logger.info('Meetings: Deleting meeting', { id: req.params.id });
      
      const success = await Meeting.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'פגישה לא נמצאה' });
      }
      
      res.status(204).send();
    } catch (error) {
      logger.error('Meetings: Error deleting meeting', { error });
      res.status(500).json({ error: 'שגיאה במחיקת הפגישה' });
    }
});

export default router;