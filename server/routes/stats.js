const express = require('express');
const router = express.Router();
const { getStatsOverview } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/overview', protect, getStatsOverview);

module.exports = router;
