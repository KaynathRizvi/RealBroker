const pool = require("../config/db");

// Get total number of properties listed by all users
const getTotalListings = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM user_property");
  return parseInt(result.rows[0].count, 10);
};

// Get total number of properties listed by a specific user
const getMyListings = async (userId) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM user_property WHERE user_id = $1",
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
};

// Get number of contact requests received by the user's properties
const getReceivedRequests = async (userId) => {
  const result = await pool.query(
    `SELECT COUNT(*) FROM contact_request cr
     JOIN user_property up ON up.id = cr.property_id
     WHERE up.user_id = $1`,
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
};

// Get number of contact requests sent by the user
const getSentRequests = async (userId) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM contact_request WHERE user_id = $1",
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
};

// Get number of new properties listed in the last 7 days
const getNewThisWeek = async () => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM user_property WHERE created_at >= NOW() - INTERVAL '7 days'"
  );
  return parseInt(result.rows[0].count, 10);
};

// Get days left until the user's subscription expires
const getDaysLeft = async (userId) => {
  const result = await pool.query(
    `SELECT expiry_date FROM user_subscriptions
     WHERE user_id = $1 AND is_active = true
     ORDER BY expiry_date DESC LIMIT 1`,
    [userId]
  );

  if (result.rows.length === 0 || !result.rows[0].expiry_date) {
    return null;
  }

  const expiryDate = new Date(result.rows[0].expiry_date);
  const today = new Date();
  const timeDiff = expiryDate - today;

  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysLeft >= 0 ? daysLeft : 0;
};

module.exports = {
  getTotalListings,
  getMyListings,
  getReceivedRequests,
  getSentRequests,
  getNewThisWeek,
  getDaysLeft,
};
