import express from 'express';
import db from './config/database';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running.');
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
