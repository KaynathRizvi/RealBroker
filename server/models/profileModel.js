const pool = require('../config/db');

async function getUserProfile(userId) {
  try {
    const { rows } = await pool.query(
      `SELECT email, name, agency_name, contact_number, license_number, location, email 
       FROM user_profile 
       WHERE user_id = $1`,
      [userId]
    );

    if (!rows || rows.length === 0) {
      return null; // Or throw an error if you want
    }

    return rows[0];
  } catch (error) {
    console.error('getUserProfile error:', error.message);
    throw error;
  }
}

async function updateUserProfile(userId, profileData) {
  try {
    console.log('Updating profile for userId:', userId);

    const { rows } = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
    if (!rows || rows.length === 0 || !rows[0].email) {
      throw new Error(`No valid email found for userId ${userId}`);
    }

    const userEmail = rows[0].email;
    const { name, agency_name, contact_number, license_number, location } = profileData;

    const result = await pool.query(
      `
      INSERT INTO user_profile (user_id, name, agency_name, contact_number, license_number, location, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (user_id) DO UPDATE 
      SET name = $2, agency_name = $3, contact_number = $4, license_number = $5, location = $6, email = $7,
          updated_at = NOW()
      RETURNING *
      `,
      [userId, name, agency_name, contact_number, license_number, location, userEmail]
    );

    console.log('Profile saved:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('updateUserProfile error:', error.message);
    throw error;
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile
};
