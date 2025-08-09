const nodemailer = require('nodemailer');

// Create a transporter object using Gmail service and authentication credentials from environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address (set in .env)
    pass: process.env.EMAIL_PASS, // Your Gmail app password or account password (set in .env)
  },
});

module.exports = transporter; // Export transporter for sending emails elsewhere in the app