const express = require('express');
const router = express.Router();
const { getStatsOverview, getListingsOverTime, requestsPerProperty } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/overview', protect, getStatsOverview);

router.get("/listings-over-time", protect, getListingsOverTime);

router.get("/requests-per-property", protect, requestsPerProperty) // ✅ here

module.exports = router;
