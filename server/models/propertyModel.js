const pool = require('../config/db');

// Add a new property for a specific user
async function addUserProperty(userId, propertyData) {
  const { property_name, deal_price, property_pic_url, property_desc } = propertyData;

  // Ensure property_pic_url is always an array (wrap if a single item)
  const propertyImage = Array.isArray(property_pic_url)
    ? property_pic_url
    : [property_pic_url];

  try {
    // Insert the new property record into the user_property table
    const result = await pool.query(
      `INSERT INTO user_property (user_id, property_name, deal_price, property_pic_url, property_desc)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,  // Return the newly inserted record
      [userId, property_name, deal_price, propertyImage, property_desc]
    );
    return result.rows[0]; // Return the inserted property data
  } catch (error) {
    console.error('Error in addUserProperty:', error.message);
    throw error;
  }
}

// Retrieve all properties for a specific user, sorted by newest first
async function getUserProperties(userId) {
  try {
    const result = await pool.query(
      `SELECT * FROM user_property WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    // Normalize property_pic_url to an array if null or undefined
    const properties = result.rows.map((row) => ({
      ...row,
      property_pic_url: row.property_pic_url || [],
    }));

    return properties;
  } catch (error) {
    console.error('Error in getUserProperties:', error.message);
    throw error;
  }
}

// Retrieve all properties from all users with owner's name included, newest first
async function getAllProperties() {
  try {
    const result = await pool.query(
      `SELECT 
         p.*, 
         pr.name
       FROM user_property p
       JOIN user_profile pr ON p.user_id = pr.user_id
       ORDER BY p.created_at DESC`
    );

    // Ensure property_pic_url field is present and correctly parsed
    const properties = result.rows.map((row) => {
      try {
        return {
          ...row,
          property_pic_url: row.property_pic_url,
        };
      } catch {
        // In case of parsing failure, fallback to empty array
        return {
          ...row,
          property_pic_url: [],
        };
      }
    });

    return properties;
  } catch (error) {
    console.error('Error in getAllProperties:', error.message);
    throw error;
  }
}

// Delete a property by its ID and return the deleted property data
async function deleteProperty(id) {
  try {
    const result = await pool.query(
      `DELETE FROM user_property WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];  // Return the deleted property record (or undefined if none)
  } catch (error) {
    console.error('Error in deleteUserProperty:', error.message);
    throw error;
  }
}

module.exports = {
  addUserProperty,
  getUserProperties,
  getAllProperties,
  deleteProperty,
};