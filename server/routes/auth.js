const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { sendResetEmail, resetPassword } = require('../controllers/passwordController');
const transporter = require('../utils/emailTransporter'); // Email utility for sending emails (used in password reset flow)

// Route to register a new user
router.post('/register', register);

// Route to log in an existing user
router.post('/login', login);

// Route to initiate password reset by sending reset email
router.post('/forgot-password', sendResetEmail);

// Route to reset password using the token received in the reset email
router.post('/reset-password/:token', resetPassword);

module.exports = router;