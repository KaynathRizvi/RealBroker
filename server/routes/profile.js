const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, addProperty } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware'); // if you have auth

router.get('/', protect, getProfile);      // GET /api/profile
router.put('/', protect, updateProfile);  // PUT /api/profile
router.post('/property', protect, addProperty); // POST /api/profile/property

module.exports = router;
