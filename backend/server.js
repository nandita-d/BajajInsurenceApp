require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/', authRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = Number(err.status || 500);
  const message = err.expose ? err.message : 'Internal Server Error';
  if (status >= 500) {
    // Keep server-side detail out of responses
    // eslint-disable-next-line no-console
    console.error(err);
  }
  res.status(status).json({ message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${port}`);
});

