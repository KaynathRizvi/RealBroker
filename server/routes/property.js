const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createProperty,
  fetchUserProperties,
  deleteProperty,
  fetchAllProperties, // <- import it
} = require('../controllers/propertyController');

// GET /api/property - fetch properties of logged-in user
router.get('/', protect, fetchUserProperties);

// POST /api/property - add property for logged-in user
router.post('/', protect, createProperty);

// GET /api/property/all - fetch all public properties
router.get('/all', fetchAllProperties); // ✅ now using controller

// DELETE /api/property/:id - delete a property
router.delete('/:id', protect, deleteProperty);

module.exports = router;
