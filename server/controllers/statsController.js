const {
  getTotalListings,
  getMyListings,
  getReceivedRequests,
  getSentRequests,
  getNewThisWeek,
  getDaysLeft,
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

module.exports = {
  getStatsOverview,
};
