import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '../../.env');
console.log('Loading .env from:', envPath);

dotenv.config({ path: envPath });

// Debug: print environment variables
console.log('Environment variables:', {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  // לא מדפיסים את הסיסמה מטעמי אבטחה
});

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error('Missing database configuration. Required variables:', {
    DB_HOST: !!DB_HOST,
    DB_USER: !!DB_USER,
    DB_PASSWORD: !!DB_PASSWORD,
    DB_NAME: !!DB_NAME
  });
  process.exit(1);
}

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const initDatabase = async () => {
  try {
    console.log('Attempting to connect to database...');
    await pool.query('SELECT 1');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error connecting to database:', {
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME
    });
    throw error;
  }
};

export default pool;