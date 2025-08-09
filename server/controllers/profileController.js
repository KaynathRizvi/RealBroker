const { updateUserProfile, getUserProfile, addUserProperty } = require('../models/profileModel');

// Get the authenticated user's profile data
async function getProfile(req, res) {
  try {
    const userId = req.user.userId; // Get userId from authenticated request
    const profile = await getUserProfile(userId); // Fetch profile from database/model
    res.json(profile); // Send profile data as JSON response
  } catch (err) {
    console.error('getProfile error:', err); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Respond with 500 on failure
  }
}

// Update the authenticated user's profile with new details
async function updateProfile(req, res) {
  try {
    const userId = req.user.userId; // Get userId from authenticated request
    // Extract profile fields from request body
    const { name, agency_name, contact_number, license_number, location } = req.body;

    // Update user profile in database/model
    await updateUserProfile(userId, { name, agency_name, contact_number, license_number, location });

    // Send success response
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error('updateProfile error:', err); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Respond with 500 on failure
  }
}

// Add a new property listing associated with the authenticated user
async function addProperty(req, res) {
  try {
    const userId = req.user.userId; // Get userId from authenticated request
    // Extract property details from request body
    const { property_name, deal_price, property_pic_url } = req.body;

    // Add new property to database/model
    const newProperty = await addUserProperty(userId, { property_name, deal_price, property_pic_url });

    // Respond with created property data and status 201 Created
    res.status(201).json(newProperty);
  } catch (err) {
    console.error('addProperty error:', err); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Respond with 500 on failure
  }
}

module.exports = {
  getProfile,
  updateProfile,
  addProperty,
};