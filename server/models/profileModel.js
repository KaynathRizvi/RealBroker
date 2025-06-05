const db = require('../config/db'); // adjust path as needed

// Create or update user profile (upsert)
async function updateUserProfile(userId, profileData) {
  try {
    const { name, agency_name, contact_number, license_number, location } = profileData;

    // Check if profile exists
    const existingProfile = await db.query(
      'SELECT id FROM user_profile WHERE user_id = $1',
      [userId]
    );

    if (existingProfile.rows.length > 0) {
      // Update existing profile
      const profileId = existingProfile.rows[0].id;
      await db.query(
        `UPDATE user_profile SET
          name = $1,
          agency_name = $2,
          contact_number = $3,
          license_number = $4,
          location = $5
        WHERE user_id = $6`,
        [name, agency_name, contact_number, license_number, location, userId]
      );
      return profileId;
    } else {
      // Insert new profile
      const result = await db.query(
        `INSERT INTO user_profile
          (user_id, name, agency_name, contact_number, license_number, location)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`,
        [userId, name, agency_name, contact_number, license_number, location]
      );
      return result.rows[0].id;
    }
  } catch (err) {
    console.error('updateUserProfile error:', err);
    throw err;
  }
}

// Get user profile by userId (including properties)
async function getUserProfile(userId) {
  try {
    const profileResult = await db.query(
      'SELECT * FROM user_profile WHERE user_id = $1',
      [userId]
    );
    if (profileResult.rows.length === 0) return null;

    const profile = profileResult.rows[0];

    const propertiesResult = await db.query(
      'SELECT * FROM user_property WHERE user_profile_id = $1',
      [profile.id]
    );

    profile.properties = propertiesResult.rows;
    return profile;
  } catch (err) {
    console.error('getUserProfile error:', err);
    throw err;
  }
}

// Add a property to user profile
async function addUserProperty(userId, propertyData) {
  try {
    // First get user_profile id for the userId
    const profileResult = await db.query(
      'SELECT id FROM user_profile WHERE user_id = $1',
      [userId]
    );

    if (profileResult.rows.length === 0) {
      throw new Error('User profile not found');
    }

    const userProfileId = profileResult.rows[0].id;

    const { property_name, deal_price, property_pic_url } = propertyData;

    const result = await db.query(
      `INSERT INTO user_property (user_profile_id, property_name, deal_price, property_pic_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userProfileId, property_name, deal_price, property_pic_url]
    );

    return result.rows[0];
  } catch (err) {
    console.error('addUserProperty error:', err);
    throw err;
  }
}

// Update a property
async function updateUserProperty(propertyId, propertyData) {
  try {
    const { property_name, deal_price, property_pic_url } = propertyData;
    const result = await db.query(
      `UPDATE user_property SET
        property_name = $1,
        deal_price = $2,
        property_pic_url = $3
       WHERE id = $4
       RETURNING *`,
      [property_name, deal_price, property_pic_url, propertyId]
    );
    return result.rows[0];
  } catch (err) {
    console.error('updateUserProperty error:', err);
    throw err;
  }
}

// Delete a property
async function deleteUserProperty(propertyId) {
  try {
    await db.query('DELETE FROM user_property WHERE id = $1', [propertyId]);
  } catch (err) {
    console.error('deleteUserProperty error:', err);
    throw err;
  }
}

module.exports = {
  updateUserProfile,
  getUserProfile,
  addUserProperty,
  updateUserProperty,
  deleteUserProperty,
};
