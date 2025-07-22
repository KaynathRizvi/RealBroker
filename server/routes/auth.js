const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { sendResetEmail, resetPassword } = require('../controllers/passwordController');
const transporter = require('../utils/emailTransporter');

router.post('/register', register);
router.post('/login', login);


router.post('/forgot-password', sendResetEmail);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
