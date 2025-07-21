const { updateUserProfile, getUserProfile, addUserProperty } = require('../models/profileModel');

async function getProfile(req, res) {
  try {
    const userId = req.user.userId; // assume user ID is in req.user after authentication
    const profile = await getUserProfile(userId);
    res.json(profile);
  } catch (err) {
    console.error('getProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.userId;
    const { name, agency_name, contact_number, license_number, location } = req.body;
    await updateUserProfile(userId, { name, agency_name, contact_number, license_number, location });
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error('updateProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function addProperty(req, res) {
  try {
    const userId = req.user.userId;
    const { property_name, deal_price, property_pic_url } = req.body;
    const newProperty = await addUserProperty(userId, { property_name, deal_price, property_pic_url });
    res.status(201).json(newProperty);
  } catch (err) {
    console.error('addProperty error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  addProperty,
};
