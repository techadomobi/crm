require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { attachAuth } = require('./middleware/auth');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || true,
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.use('/api', attachAuth, routes);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`CRM proxy listening on http://localhost:${port}`);
});
