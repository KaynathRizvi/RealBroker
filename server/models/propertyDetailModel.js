const pool = require('../config/db');

// Fetch detailed information about a property by its ID
async function getPropertyDetailById(id) {
  // SQL query to retrieve property details and owner name from joined tables
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

  // Execute the query with the given property id
  const result = await pool.query(query, [id]);
  const property = result.rows[0];  // Get the first row (property detail)

  if (property) {
    try {
      // Ensure property_pic_url is an array; if not, fallback to empty array
      property.property_pic_url = Array.isArray(property.property_pic_url)
        ? property.property_pic_url
        : [];
    } catch (e) {
      // Log parsing errors and assign empty array to property_pic_url
      console.error("Failed to parse property_pic_url:", e);
      property.property_pic_url = [];
    }
  }

  // Return the property detail object or undefined if not found
  return property;
}

module.exports = {
  getPropertyDetailById,
};