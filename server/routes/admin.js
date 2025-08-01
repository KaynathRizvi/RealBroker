const express = require('express');
const router = express.Router();
const { login, getUsers, deleteUser, getProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/adminAuth');
const { getAdminProperties, getAdminPropertyDetail, deleteProperty } = require('../controllers/adminController');
const { sendAdminResetEmail, resetAdminPassword } = require('../controllers/adminPasswordController');

router.post('/login', login);
router.get('/users', protect, getUsers);
router.delete('/users/:id',  protect, deleteUser);
router.get('/users/:id', protect, getProfile);

router.get('/properties',  protect, getAdminProperties);

router.post('/forgot-password', sendAdminResetEmail);
router.post('/reset-password/:token', resetAdminPassword);

router.get('/property/:id', protect, getAdminPropertyDetail);

// DELETE /api/property/:id - delete a property
router.delete('/property/:id', protect, deleteProperty);

module.exports = router;
