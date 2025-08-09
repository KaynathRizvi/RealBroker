const jwt = require('jsonwebtoken'); // JWT library for token creation and verification
const nodemailer = require('nodemailer'); // Library for sending emails
const bcrypt = require('bcryptjs'); // Library for hashing passwords securely
const pool = require('../config/db'); // PostgreSQL connection pool

// Sends a password reset email to the admin user with a time-limited JWT token link
const sendAdminResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if a user with the given email exists in the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      // Return 404 if no user found
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Create a JWT token with the user ID, expires in 15 minutes
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Generate the password reset link containing the JWT token as a query parameter
    const resetLink = `${process.env.ADMIN_URL}/reset-password?token=${token}`;

    // Configure the email transporter using Gmail SMTP and credentials from env variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the password reset email with HTML content including a button and fallback link
    await transporter.sendMail({
      from: `"Real Broker Admin Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Admin Password Reset - Real Broker',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #223b61;">Admin Password Reset</h2>
          <p>Hello Admin,</p>
          <p>A password reset request has been initiated for your administrator account on <strong>Real Broker</strong>.</p>
          <p>To proceed, click the button below. This secure link will expire in <strong>1 hour</strong> for your protection.</p>
          <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #223b61; color: #ffffff; text-decoration: none; border-radius: 4px;">Reset Admin Password</a>
          <p>If the button doesn’t work, please copy and paste this URL into your browser:</p>
          <p style="word-break: break-all;"><a href="${resetLink}" style="color: #223b61;">${resetLink}</a></p>
          <hr style="margin: 30px 0;">
          <p style="font-size: 14px; color: #777;">If you did not request this password reset, please contact the Real Broker security team immediately or disregard this email.</p>
          <p style="font-size: 14px; color: #777;">— Real Broker Admin Team</p>
        </div>
      `
    });

    // Respond with success message after sending email
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    // Log and respond with error message if something goes wrong
    console.error('Forgot password error:', err.message);
    res.status(500).json({ message: 'Invalid email' });
  }
};

// Resets the admin password by verifying the JWT token and updating hashed password in DB
const resetAdminPassword = async (req, res) => {
  const { token } = req.params; // JWT token passed as URL param
  const { newPassword } = req.body; // New password sent in request body

  try {
    // Verify and decode the JWT token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Hash the new password securely with bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    // Respond with success message
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    // Log error and respond if token is invalid or expired
    console.error('Reset password error:', err.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { sendAdminResetEmail, resetAdminPassword };