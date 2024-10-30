import express from 'express';
import pool from '../config/database.js';

export const router = express.Router();

// Get all development groups
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM development_groups');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching development groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new development group
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO development_groups (name) VALUES (?)',
      [name]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.error('Error creating development group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 