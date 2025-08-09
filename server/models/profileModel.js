const pool = require('../config/db');

// Fetch the user profile information for a given userId
// Returns an object with email, name, agency_name, contact_number, license_number, location
// If no profile found, returns null
async function getUserProfile(userId) {
  try {
    const { rows } = await pool.query(
      `SELECT email, name, agency_name, contact_number, license_number, location, email 
       FROM user_profile 
       WHERE user_id = $1`,
      [userId]
    );

    // If no rows found, return null indicating no profile exists
    if (!rows || rows.length === 0) {
      return null;
    }

    // Return the first (and only) profile record found
    return rows[0];
  } catch (error) {
    console.error('getUserProfile error:', error.message);
    throw error; // Re-throw the error to be handled upstream
  }
}

// Update or insert a user profile for the given userId and profileData
// Uses UPSERT logic: INSERT if no profile exists, else UPDATE existing profile
// Ensures the profile's email matches the one in the users table for consistency
// Returns the newly inserted or updated profile record
async function updateUserProfile(userId, profileData) {
  try {
    console.log('Updating profile for userId:', userId);

    // Fetch user's email from users table to keep profile email consistent
    const { rows } = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);

    // Throw error if user email is missing (user may not exist)
    if (!rows || rows.length === 0 || !rows[0].email) {
      throw new Error(`No valid email found for userId ${userId}`);
    }

    const userEmail = rows[0].email;
    const { name, agency_name, contact_number, license_number, location } = profileData;

    // Insert or update profile using ON CONFLICT on user_id
    // updated_at timestamp is set to NOW() on updates
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
    throw error; // Re-throw error to be handled by caller
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile
};