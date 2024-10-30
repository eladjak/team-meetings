import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { router as meetingsRouter } from './routes/meetings.js';
import { router as teamsRouter } from './routes/teams.js';
import { initDatabase } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/meetings', meetingsRouter);
app.use('/api/development-groups', teamsRouter);

// Initialize database and start server
initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
}); 