const pool = require('../config/db');

// Find admin user by email
const findAdminByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Get all users (if admin wants to see them)
const getAllUsers = async () => {
  const result = await pool.query('SELECT id, email, role FROM users');
  return result.rows;
};

const deleteUserById = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1 AND role = $2', 
    [id, 'user']);
};

const getAllWithOwnerEmail = async () => {
  const result = await pool.query(`
    SELECT 
      p.*, 
      u.email,
      pr.name AS owner_name
    FROM user_property p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN user_profile pr ON p.user_id = pr.user_id
  `);
  return result.rows;
};

async function deleteUserProperty(propertyId) {
  try {
    const result = await pool.query(
      'DELETE FROM user_property WHERE id = $1',
      [propertyId]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error in deleteProperty:', error.message);
    throw error;
  }
}

module.exports = {
  findAdminByEmail,
  getAllUsers,
  deleteUserById,
  getAllWithOwnerEmail,
  deleteUserProperty,
};
