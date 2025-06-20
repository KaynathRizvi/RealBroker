const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile, addUserProperty } = require('../models/profileModel');

// GET /api/profile
// GET /api/profile
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await getUserProfile(userId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error('Error in GET /api/profile:', err);  // Add this
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT /api/profile
router.put('/', protect, async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log('Incoming profile PUT payload:', req.body);

    const updatedProfile = await updateUserProfile(userId, req.body);

    res.json(updatedProfile); // send back the updated profile
  } catch (err) {
    console.error('Error in PUT /api/profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;