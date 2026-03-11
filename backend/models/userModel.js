const pool = require('../config/db');

// MySQL table (run once):
// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

const findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT id, name, email, password, created_at FROM users WHERE email = ? LIMIT 1', [
    email,
  ]);
  return rows[0] || null;
};

const createUser = async ({ name, email, passwordHash }) => {
  const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
    name,
    email,
    passwordHash,
  ]);
  return result.insertId;
};

module.exports = { findByEmail, createUser };

