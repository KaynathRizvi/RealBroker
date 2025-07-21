const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addUserProperty,
  getUserProperties,
  getAllProperties,
  deleteUserProperty,
} = require('../models/propertyModel');

// GET /api/property - fetch all properties for a user
router.get('/', protect, async (req, res) => {
  try {
    const properties = await getUserProperties(req.user.userId);
    res.json(properties);
  } catch (err) {
    console.error('Failed to fetch properties:', err.message);
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

// GET /api/property/all - fetch all properties (public)
router.get('/all', async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.json(properties);
  } catch (err) {
    console.error('Failed to fetch properties:', err.message);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

// DELETE /api/property/:id - delete a property for a user
router.delete('/:id', protect, async (req, res) => {
  try {
    const userId = req.user.userId;
    const propertyId = parseInt(req.params.id);

    const deleted = await deleteUserProperty(userId, propertyId);
    if (!deleted) {
      return res.status(404).json({ message: 'Property not found or not yours' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
