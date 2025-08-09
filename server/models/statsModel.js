const pool = require("../config/db");

// Get total number of properties listed by all users
const getTotalListings = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM user_property");
  // Return count as integer
  return parseInt(result.rows[0].count, 10);
};

// Get total number of properties listed by a specific user
const getMyListings = async (userId) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM user_property WHERE user_id = $1",
    [userId]
  );
  // Return count as integer
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
  // Return count as integer
  return parseInt(result.rows[0].count, 10);
};

// Get number of contact requests sent by the user
const getSentRequests = async (userId) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM contact_request WHERE user_id = $1",
    [userId]
  );
  // Return count as integer
  return parseInt(result.rows[0].count, 10);
};

// Get number of new properties listed in the last 7 days
const getNewThisWeek = async () => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM user_property WHERE created_at >= NOW() - INTERVAL '7 days'"
  );
  // Return count as integer
  return parseInt(result.rows[0].count, 10);
};

// Get number of days left until the user's active subscription expires
const getDaysLeft = async (userId) => {
  const result = await pool.query(
    `SELECT expiry_date FROM user_subscriptions
     WHERE user_id = $1 AND is_active = true
     ORDER BY expiry_date DESC LIMIT 1`,
    [userId]
  );

  // If no active subscription found, return null
  if (result.rows.length === 0 || !result.rows[0].expiry_date) {
    return null;
  }

  const expiryDate = new Date(result.rows[0].expiry_date);
  const today = new Date();

  // Normalize both dates to midnight to calculate full days difference
  expiryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const timeDiff = expiryDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Return 0 if subscription expired
  return daysLeft >= 0 ? daysLeft : 0;
};

// Get number of property listings created each day for the last 30 days
const getListingsOverLast30Days = async () => {
  const result = await pool.query(`
    SELECT 
      TO_CHAR(created_at::date, 'YYYY-MM-DD') AS date,
      COUNT(*) as count
    FROM user_property
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY date
    ORDER BY date ASC
  `);

  // Format data for frontend chart: labels = dates, data = counts
  const labels = result.rows.map(row => row.date);
  const data = result.rows.map(row => parseInt(row.count, 10));

  return { labels, data };
};

// Get number of contact requests received per property for a given user
async function getRequestsPerProperty(userId) {
  try {
    const query = `
      SELECT up.property_name, COUNT(cr.id) AS request_count
      FROM user_property up
      LEFT JOIN contact_request cr ON cr.property_id = up.id
      WHERE up.user_id = $1
      GROUP BY up.property_name
      ORDER BY request_count DESC;
    `
    const result = await pool.query(query, [userId]);

    console.log("requestsPerProperty result:", result);

    // Defensive check for result.rows
    const rows = result.rows || result;

    // Map result to simplified object format with counts as numbers
    return rows.map((row) => ({
      property_name: row.property_name,
      request_count: Number(row.request_count),
    }));
  } catch (error) {
    console.error("Error in getRequestsPerProperty:", error);
    throw error;
  }
}

module.exports = {
  getTotalListings,
  getMyListings,
  getReceivedRequests,
  getSentRequests,
  getListingsOverLast30Days,
  getNewThisWeek,
  getDaysLeft,
  getRequestsPerProperty,
};