const {
  getTotalListings,
  getMyListings,
  getReceivedRequests,
  getSentRequests,
  getNewThisWeek,
  getDaysLeft,
  getListingsOverLast30Days,
  getRequestsPerProperty,
} = require("../models/statsModel");

const getStatsOverview = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    const [
      totalListings,
      myListings,
      receivedRequests,
      sentRequests,
      newThisWeek,
      daysLeft,
    ] = await Promise.all([
      getTotalListings(),
      getMyListings(userId),
      getReceivedRequests(userId),
      getSentRequests(userId),
      getNewThisWeek(),
      getDaysLeft(userId),
    ]);

    res.json({
      totalListings,
      myListings,
      receivedRequests,
      sentRequests,
      newThisWeek,
      daysLeft,
    });
  } catch (err) {
    console.error("Stats overview error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getListingsOverTime = async (req, res) => {
  try {
    const result = await getListingsOverLast30Days();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getListingsOverTime:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const requestsPerProperty = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await getRequestsPerProperty(userId);
    return res.json(result);
  } catch (error) {
    console.error("Error in requestsPerProperty:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getStatsOverview,
  getListingsOverTime,
  requestsPerProperty, // ✅ Exported properly now
};
