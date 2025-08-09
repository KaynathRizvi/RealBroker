const pool = require('../config/db');

// Find admin user by email
// Returns the user object for the given email if found, otherwise undefined
const findAdminByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Get all users from the database
// Returns an array of users with id, email, and role fields
const getAllUsers = async () => {
  const result = await pool.query('SELECT id, email, role FROM users');
  return result.rows;
};

// Delete a user by their ID
// - Checks if the user exists
// - Prevents deletion if the user has admin role
// Returns an object indicating if deletion succeeded or the reason it failed
const deleteUserById = async (id) => {
  // Fetch the user's role first
  const result = await pool.query('SELECT role FROM users WHERE id = $1', [id]);

  // User not found
  if (result.rows.length === 0) {
    return { deleted: false, reason: 'not_found' };
  }

  const user = result.rows[0];
  // Prevent deleting admin users
  if (user.role === 'admin') {
    return { deleted: false, reason: 'cannot_delete_admin' };
  }

  // Delete user from DB
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return { deleted: true };
};

// Get all properties with owner's email and profile name (owner_name)
// Joins user_property with users and user_profile tables to include owner details
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

// Delete a property by its ID from user_property table
// Returns true if a property was deleted, false otherwise
async function deleteUserProperty(propertyId) {
  try {
    const result = await pool.query(
      'DELETE FROM user_property WHERE id = $1',
      [propertyId]
    );
    return result.rowCount > 0; // rowCount > 0 means deletion happened
  } catch (error) {
    console.error('Error in deleteProperty:', error.message);
    throw error;
  }
}

// Get detailed profile info for a user by their ID
// Joins users and user_profile tables to fetch profile info along with user info
const getProfileById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      u.id AS user_id,
      u.email,
      u.role,
      up.id AS profile_id,
      up.name,
      up.agency_name,
      up.contact_number,
      up.license_number,
      up.location,
      up.created_at,
      up.updated_at
    FROM users u
    LEFT JOIN user_profile up ON u.id = up.user_id
    WHERE u.id = $1
    `,
    [id]
  );
  return result.rows[0];
};

// Get detailed information about a property by its ID (admin view)
// Includes property info and owner's profile name
// Also tries to ensure property_pic_url is an array, defaults to empty array if parsing fails
async function getAdminPropertyDetailById(id) {
  const query = `
    SELECT 
      up.id AS property_id,
      up.property_name,
      up.deal_price,
      up.property_pic_url,
      up.property_desc,
      up.created_at,
      up.updated_at,
      pr.name AS owner_name
    FROM user_property up
    JOIN user_profile pr ON up.user_id = pr.user_id
    WHERE up.id = $1
  `;

  const result = await pool.query(query, [id]);
  const property = result.rows[0];

  if (property) {
    try {
      // Ensure property_pic_url is an array (could be stored as JSON or string)
      property.property_pic_url = Array.isArray(property.property_pic_url)
        ? property.property_pic_url
        : [];
    } catch (e) {
      console.error("Failed to parse property_pic_url:", e);
      property.property_pic_url = [];
    }
  }

  return property;
}

module.exports = {
  findAdminByEmail,
  getAllUsers,
  deleteUserById,
  getAllWithOwnerEmail,
  deleteUserProperty,
  getProfileById,
  getAdminPropertyDetailById,
};