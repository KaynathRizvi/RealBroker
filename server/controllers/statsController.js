const {  getTotalListings, getMyListings, getReceivedRequests, getSentRequests, 
  getNewThisWeek, getDaysLeft, getListingsOverLast30Days, getRequestsPerProperty 
} = require("../models/statsModel");

// Controller to get an overview of key stats for the current user and platform
const getStatsOverview = async (req, res) => {
  try {
    // Extract user ID from authenticated request (supporting multiple possible fields)
    const userId = req.user.userId || req.user.id;

    // Run multiple async model calls in parallel to gather stats
    const [
      totalListings,    // Total listings on platform
      myListings,       // Listings belonging to current user
      receivedRequests, // Contact requests received by user
      sentRequests,     // Contact requests sent by user
      newThisWeek,      // New listings added this week
      daysLeft,         // Days left (e.g., subscription or other expiry)
    ] = await Promise.all([
      getTotalListings(),
      getMyListings(userId),
      getReceivedRequests(userId),
      getSentRequests(userId),
      getNewThisWeek(),
      getDaysLeft(userId),
    ]);

    // Send combined stats as JSON response
    res.json({
      totalListings,
      myListings,
      receivedRequests,
      sentRequests,
      newThisWeek,
      daysLeft,
    });
  } catch (err) {
    // Log error and send generic internal server error response
    console.error("Stats overview error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get listing counts over the last 30 days (for graphing/trends)
const getListingsOverTime = async (req, res) => {
  try {
    // Fetch aggregated listings data from model
    const result = await getListingsOverLast30Days();
    res.status(200).json(result);
  } catch (error) {
    // Log error and send generic internal server error response
    console.error("Error in getListingsOverTime:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get number of contact requests per property for the current user
const requestsPerProperty = async (req, res) => {
  try {
    // Extract user ID with fallback for different property names
    const userId = req.user?.id || req.user?.userId;

    // Return 401 if user not authenticated
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch requests count grouped by property for user
    const result = await getRequestsPerProperty(userId);

    // Send data as JSON response
    return res.json(result);
  } catch (error) {
    // Log error and send generic server error response
    console.error("Error in requestsPerProperty:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getStatsOverview,
  getListingsOverTime,
  requestsPerProperty, // Export controller functions
};