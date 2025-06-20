// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addUserProperty, getUserProperties, getAllProperties } = require('../models/propertyModel');

// GET /api/property - fetch all properties for a user
router.get('/', protect, async (req, res) => {
  try {
    const properties = await getUserProperties(req.user.userId);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

// POST /api/property - add a new property
router.post('/', protect, async (req, res) => {
  console.log('Incoming body:', req.body);
  console.log('Authenticated user:', req.user);

  try {
    const userId = req.user.userId;
    const newProperty = await addUserProperty(userId, req.body);
    res.json(newProperty);
  } catch (err) {
    console.error('Failed to add property:', err.message);
    res.status(500).json({ message: 'Failed to add property' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.json(properties);
  } catch (err) {
    console.error('Failed to fetch properties:', err);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});


module.exports = router;
