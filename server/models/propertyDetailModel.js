const pool = require('../config/db');

async function getPropertyDetailById(id) {
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
  getPropertyDetailById,
};
