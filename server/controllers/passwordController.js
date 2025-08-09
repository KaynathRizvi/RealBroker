const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// Send password reset email to user
const sendResetEmail = async (req, res) => {
  const { email } = req.body; // Extract email from request body

  try {
    // Query database for user with the provided email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // If no user found, respond with 404 Not Found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Create a JWT token containing the userId, valid for 15 minutes
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Construct the password reset link including the token as query param
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    // Set up email transporter using Gmail SMTP with credentials from environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email with reset password instructions and reset link
    await transporter.sendMail({
      from: `"Real Broker Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Real Broker',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f4f6f8; border-radius: 8px; border: 1px solid #e0e0e0;">
          <div style="text-align: center;">
            <h1 style="color: #223b61; margin-bottom: 8px;">Real Broker</h1>
            <p style="font-size: 14px; color: #777;">www.realbroker.com</p>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <h2 style="color: #223b61;">Reset Your Password</h2>
          <p>Hello,</p>
          <p>We received a request to reset the password for your Real Broker account. If you initiated this request, please click the button below to reset your password. This link will expire in <strong>1 hour</strong>.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #223b61; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; font-size: 14px;"><a href="${resetLink}" style="color: #223b61;">${resetLink}</a></p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 13px; color: #777;">If you did not request a password reset, you can safely ignore this email. Your account will remain secure.</p>
          <p style="font-size: 13px; color: #777;">— The Real Broker Team</p>
        </div>
      `
    });

    // Respond with success message
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    // Log error message and respond with 500 Internal Server Error
    console.error('Forgot password error:', err.message);
    res.status(500).json({ message: 'Invalid email' });
  }
};

// Reset password using token and new password
const resetPassword = async (req, res) => {
  const { token } = req.params;       // Extract token from URL params
  const { newPassword } = req.body;   // Extract new password from request body

  try {
    // Verify JWT token and extract userId payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Hash the new password before storing
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    // Respond with success message
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    // Log error and respond with 400 Bad Request for invalid or expired token
    console.error('Reset password error:', err.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { sendResetEmail, resetPassword };