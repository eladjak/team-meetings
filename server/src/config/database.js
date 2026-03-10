/**
 * הגדרות חיבור לבסיס הנתונים
 * כולל פול חיבורים וניהול שגיאות
 * 
 * @module database
 */

import mysql from 'mysql2/promise';
import logger from '../../utils/logger';

// הגדרות חיבור מה-.env
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'team_meetings',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'Asia/Jerusalem'
};

// יצירת פול חיבורים
const pool = mysql.createPool(dbConfig);

// בדיקת חיבור ראשונית
pool.getConnection()
  .then(connection => {
    logger.info('Database: Successfully connected to MySQL');
    connection.release();
  })
  .catch(error => {
    logger.error('Database: Error connecting to MySQL', { error });
    process.exit(1);
  });

/**
 * ביצוע שאילתה עם ניהול שגיאות
 * @param {string} query - שאילתת SQL
 * @param {Array} params - פרמטרים לשאילתה
 * @returns {Promise} תוצאת השאילתה
 */
export const executeQuery = async (query, params = []) => {
  try {
    logger.debug('Database: Executing query', { query, params });
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    logger.error('Database: Query execution error', { error, query, params });
    throw error;
  }
};

/**
 * ביצוע טרנזקציה
 * @param {Function} callback - פונקציה המכילה את פעולות הטרנזקציה
 * @returns {Promise} תוצאת הטרנזקציה
 */
export const executeTransaction = async (callback) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    logger.debug('Database: Starting transaction');
    
    const result = await callback(connection);
    
    await connection.commit();
    logger.debug('Database: Transaction committed');
    
    return result;
  } catch (error) {
    await connection.rollback();
    logger.error('Database: Transaction rolled back', { error });
    throw error;
  } finally {
    connection.release();
  }
};

export default {
  pool,
  executeQuery,
  executeTransaction
};