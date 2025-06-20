const pool = require('../config/db');

async function addUserProperty(userId, propertyData) {
  const { property_name, deal_price, property_pic_url } = propertyData;

  try {
    const result = await pool.query(
      `INSERT INTO user_property (user_id, property_name, deal_price, property_pic_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, property_name, deal_price, property_pic_url]
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
    return result.rows;
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
         u.email 
       FROM user_property p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );
    return result.rows;
  } catch (error) {
    console.error('Error in getAllProperties:', error.message);
    throw error;
  }
}

module.exports = {
  addUserProperty,
  getUserProperties,
  getAllProperties, // renamed here
};
