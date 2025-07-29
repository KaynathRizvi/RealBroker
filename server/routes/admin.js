const express = require('express');
const router = express.Router();
const { login, getUsers, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/adminAuth');
const { getAdminProperties, deleteProperty } = require('../controllers/adminController');
const { sendAdminResetEmail, resetAdminPassword } = require('../controllers/adminPasswordController');

router.post('/login', login);
router.get('/users', protect, getUsers);
router.delete('/users/:id',  protect, deleteUser);
router.get('/properties',  protect, getAdminProperties);

router.post('/forgot-password', sendAdminResetEmail);
router.post('/reset-password/:token', resetAdminPassword);

// DELETE /api/property/:id - delete a property
router.delete('/:id', protect, deleteProperty);

module.exports = router;
