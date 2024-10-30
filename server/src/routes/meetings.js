import express from 'express';
import pool from '../config/database.js';

export const router = express.Router();

// Get meetings for specific group
router.get('/:groupId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM meetings WHERE development_group_id = ? ORDER BY start_time',
      [req.params.groupId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// הוספת פונקציית עזר להמרת תאריך
const formatDateForMySQL = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 19).replace('T', ' ');
};

// Create new meeting
router.post('/', async (req, res) => {
  const { developmentGroupId, description, startTime, endTime, room } = req.body;

  console.log('Received meeting data:', {
    developmentGroupId,
    description,
    startTime,
    endTime,
    room
  });

  try {
    // בדיקה שהקבוצה קיימת
    const [groups] = await pool.query(
      'SELECT id FROM development_groups WHERE id = ?',
      [developmentGroupId]
    );

    if (groups.length === 0) {
      return res.status(404).json({ error: 'Development group not found' });
    }

    // המרת התאריכים לפורמט MySQL
    const formattedStartTime = formatDateForMySQL(startTime);
    const formattedEndTime = formatDateForMySQL(endTime);

    // בדיקת חפיפה
    const [overlapping] = await pool.query(
      `SELECT * FROM meetings 
       WHERE development_group_id = ? 
       AND ((start_time BETWEEN ? AND ?) 
       OR (end_time BETWEEN ? AND ?))`,
      [developmentGroupId, formattedStartTime, formattedEndTime, formattedStartTime, formattedEndTime]
    );

    if (overlapping.length > 0) {
      return res.status(409).json({ error: 'Meeting time conflicts with existing meeting' });
    }

    // יצירת הפגישה
    const [result] = await pool.query(
      `INSERT INTO meetings 
       (development_group_id, description, start_time, end_time, room) 
       VALUES (?, ?, ?, ?, ?)`,
      [developmentGroupId, description, formattedStartTime, formattedEndTime, room]
    );

    res.status(201).json({ 
      id: result.insertId,
      message: 'Meeting created successfully' 
    });

  } catch (error) {
    console.error('Error creating meeting:', {
      error: error.message,
      stack: error.stack,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      code: error.code
    });
    
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// עדכון פגישה
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { developmentGroupId, description, startTime, endTime, room } = req.body;

  try {
    const formattedStartTime = formatDateForMySQL(startTime);
    const formattedEndTime = formatDateForMySQL(endTime);

    // בדיקת חפיפה (מלבד הפגישה הנוכחית)
    const [overlapping] = await pool.query(
      `SELECT * FROM meetings 
       WHERE development_group_id = ? 
       AND id != ?
       AND ((start_time BETWEEN ? AND ?) 
       OR (end_time BETWEEN ? AND ?))`,
      [developmentGroupId, id, formattedStartTime, formattedEndTime, formattedStartTime, formattedEndTime]
    );

    if (overlapping.length > 0) {
      return res.status(409).json({ error: 'Meeting time conflicts with existing meeting' });
    }

    await pool.query(
      `UPDATE meetings 
       SET development_group_id = ?, description = ?, start_time = ?, end_time = ?, room = ?
       WHERE id = ?`,
      [developmentGroupId, description, formattedStartTime, formattedEndTime, room, id]
    );

    res.json({ message: 'Meeting updated successfully' });
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// מחיקת פגישה
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM meetings WHERE id = ?', [id]);
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});