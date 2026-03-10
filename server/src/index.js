import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import meetingsRouter from './routes/meetings.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/meetings', meetingsRouter);

// בדיקת חיבור
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 