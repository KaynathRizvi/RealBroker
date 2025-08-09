const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfile, updateProfile, addProperty, } = require('../controllers/profileController');

// GET /api/profile
router.get('/', protect, getProfile);

// PUT /api/profile
router.put('/', protect, updateProfile);

// POST /api/profile/property (optional route for properties)
router.post('/property', protect, addProperty);

module.exports = router;
