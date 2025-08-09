const pool = require('../config/db');

// Find a user by their email address
// Returns the user object if found, otherwise undefined
const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Create a new user with the given email and hashed password
// Returns the newly created user record
const createUser = async (email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};