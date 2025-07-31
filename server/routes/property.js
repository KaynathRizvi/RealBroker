const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createProperty,
  fetchUserProperties,
  fetchAllProperties, 
  getPropertyDetail,
  deleteUserProperty,
} = require('../controllers/propertyController');

// GET /api/property - fetch properties of logged-in user
router.get('/', protect, fetchUserProperties);

// POST /api/property - add property for logged-in user
router.post('/', protect, createProperty);

// GET /api/property/all - fetch all public properties
router.get('/all', fetchAllProperties); // ✅ now using controller

router.get('/:id', getPropertyDetail);

router.delete('/:id', protect, deleteUserProperty);

module.exports = router;
