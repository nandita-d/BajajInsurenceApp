require('dotenv').config();

const pool = require('../config/db');

const run = async () => {
  // Create table if it doesn't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // eslint-disable-next-line no-console
  console.log('DB ready: table `users` ensured.');
  await pool.end();
};

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('DB init failed:', err.message);
  process.exitCode = 1;
});

