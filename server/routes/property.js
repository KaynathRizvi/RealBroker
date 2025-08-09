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

// GET /api/property
// Protected route: fetch properties belonging to the logged-in user
router.get('/', protect, fetchUserProperties);

// POST /api/property
// Protected route: add a new property for the logged-in user
router.post('/', protect, createProperty);

// GET /api/property/all
// Public route: fetch all public property listings
router.get('/all', fetchAllProperties); // ✅ using controller to get all properties

// GET /api/property/:id
// Public route: get detailed info about a specific property by its ID
router.get('/:id', getPropertyDetail);

// DELETE /api/property/:id
// Protected route: delete a property owned by the logged-in user by its ID
router.delete('/:id', protect, deleteUserProperty);

module.exports = router;