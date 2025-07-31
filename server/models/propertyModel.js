const pool = require('../config/db');

async function addUserProperty(userId, propertyData) {
  const { property_name, deal_price, property_pic_url, property_desc } = propertyData;

   const propertyImage = Array.isArray(property_pic_url)
    ? property_pic_url
    : [property_pic_url];

  try {
    const result = await pool.query(
      `INSERT INTO user_property (user_id, property_name, deal_price, property_pic_url, property_desc)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, property_name, deal_price, propertyImage, property_desc]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error in addUserProperty:', error.message);
    throw error;
  }
}

async function getUserProperties(userId) {
  try {
    const result = await pool.query(
      `SELECT * FROM user_property WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

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

    const properties = result.rows.map((row) => {
      try {
        return {
          ...row,
          property_pic_url: row.property_pic_url,
        };
      } catch {
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

async function deleteProperty(id) {
  try {
    const result = await pool.query(
      `DELETE FROM user_property WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
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
