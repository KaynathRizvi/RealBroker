const express = require('express');
const router = express.Router();
const { login, getUsers, deleteUser } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const { getAdminProperties } = require('../controllers/adminController');
const { sendAdminResetEmail, resetAdminPassword } = require('../controllers/adminPasswordController');

router.post('/login', login);
router.get('/users', adminAuth, getUsers);
router.delete('/users/:id', adminAuth, deleteUser);
router.get('/properties', adminAuth, getAdminProperties);

router.post('/forgot-password', sendAdminResetEmail);
router.post('/reset-password/:token', resetAdminPassword);

module.exports = router;
