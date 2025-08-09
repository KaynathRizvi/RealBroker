const express = require('express');
const router = express.Router();
const { getStatsOverview, getListingsOverTime, requestsPerProperty } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/stats/overview
// Protected route: Get summary statistics overview for the logged-in user
router.get('/overview', protect, getStatsOverview);

// GET /api/stats/listings-over-time
// Protected route: Get property listing counts over time (e.g., last 30 days) for charts
router.get('/listings-over-time', protect, getListingsOverTime);

// GET /api/stats/requests-per-property
// Protected route: Get number of contact requests received per property for the logged-in user
router.get('/requests-per-property', protect, requestsPerProperty); // ✅ endpoint to fetch requests per property

module.exports = router;