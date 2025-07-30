const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const sendAdminResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `${process.env.ADMIN_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  await transporter.sendMail({
    from: `"Real Broker Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password - Real Broker',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #223b61;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your Real Broker account.</p>
        <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
        <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #223b61; color: #ffffff; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
        <p style="word-break: break-all;"><a href="${resetLink}" style="color: #223b61;">${resetLink}</a></p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 14px; color: #777;">If you didn’t request a password reset, you can ignore this email. Your password will remain unchanged.</p>
        <p style="font-size: 14px; color: #777;">— Real Broker Team</p>
    </div>
  `
});

const resetAdminPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { sendAdminResetEmail, resetAdminPassword };
