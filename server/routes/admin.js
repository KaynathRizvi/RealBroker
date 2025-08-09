const express = require('express');
const router = express.Router();

const { 
  login, 
  getUsers, 
  deleteUser, 
  getProfile,
  getAdminProperties,
  getAdminPropertyDetail,
  deleteProperty
} = require('../controllers/adminController');

const { protect } = require('../middleware/adminAuth');

const { sendAdminResetEmail, resetAdminPassword } = require('../controllers/adminPasswordController');

// Admin login route (no authentication required)
router.post('/login', login);

// Get all users (protected route, requires admin authentication)
router.get('/users', protect, getUsers);

// Delete a specific user by ID (protected route)
router.delete('/users/:id',  protect, deleteUser);

// Get profile details for a specific user by ID (protected route)
router.get('/users/:id', protect, getProfile);

// Get all properties (protected route)
router.get('/properties', protect, getAdminProperties);

// Send password reset email for admin (no authentication required)
router.post('/forgot-password', sendAdminResetEmail);

// Reset admin password using a token (no authentication required)
router.post('/reset-password/:token', resetAdminPassword);

// Get details of a specific property by ID (protected route)
router.get('/property/:id', protect, getAdminPropertyDetail);

// Delete a specific property by ID (protected route)
router.delete('/property/:id', protect, deleteProperty);

module.exports = router;