const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const sendAdminResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const admin = result.rows[0];
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${process.env.ADMIN_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Password Reset',
      html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: 'Password reset email sent to admin' });

  } catch (err) {
    console.error('Admin forgot password error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const resetAdminPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.adminId;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE admins SET password = $1 WHERE id = $2', [hashedPassword, adminId]);

    res.json({ message: 'Admin password updated successfully' });
  } catch (err) {
    console.error('Admin reset password error:', err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  sendAdminResetEmail,
  resetAdminPassword,
};
