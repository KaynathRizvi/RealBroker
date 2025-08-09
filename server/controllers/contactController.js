const contactModel = require('../models/contactModel');

// Create a new contact request for a property
async function createContactRequest(req, res) {
  const { property_id, name, agency, phone, email, message } = req.body;
  const userId = req.user?.userId; // Get userId from the authenticated JWT token payload
  console.log('Decoded JWT:', req.user);

  // Check if user is authenticated
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Save contact request in the database with userId association
    await contactModel.saveContactRequest({ property_id, name, agency, phone, email, message, userId });
    // Respond with success message and 201 Created status
    res.status(201).json({ message: 'Contact request sent' });
  } catch (err) {
    // Log any errors and send 500 Internal Server Error response
    console.error('Error saving contact request:', err);
    res.status(500).json({ error: 'Failed to send request' });
  }
}

// Get all contact requests for properties owned by the authenticated user
async function getContactRequestsForOwner(req, res) {
  const userId = req.user.userId; // Owner userId from JWT token

  try {
    // Retrieve all contact requests associated with properties owned by this user
    const requests = await contactModel.getContactRequestsForOwner(userId);
    // Send back the requests as JSON
    res.json(requests);
  } catch (err) {
    // Log error and respond with 500 Internal Server Error
    console.error('Error fetching contact requests:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Accept a specific contact request by its ID
async function acceptContactRequest(req, res) {
  const { requestId } = req.params; // Request ID from URL params
  const userId = req.user.userId;   // Authenticated user's ID

  try {
    // Mark the contact request as accepted, verifying ownership with userId
    await contactModel.acceptContactRequestById(requestId, userId);
    // Respond with success message
    res.status(200).json({ message: 'Request accepted' });
  } catch (err) {
    // Log error and send 500 Internal Server Error with message
    console.error('Error accepting request:', err.message);
    res.status(500).json({ error: err.message || 'Failed to accept request' });
  }
}

// Reject (delete) a specific contact request by its ID
async function rejectContactRequest(req, res) {
  const { requestId } = req.params; // Request ID from URL params

  try {
    // Delete the contact request from database
    await contactModel.rejectContactRequestById(requestId);
    // Respond with success message
    res.status(200).json({ message: 'Request deleted' });
  } catch (err) {
    // Log error and send 500 Internal Server Error response
    console.error('Error rejecting request:', err);
    res.status(500).json({ error: 'Failed to reject request' });
  }
}

// Get all contact requests sent by the authenticated user
const getSentRequestsByUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Authenticated user's ID
    // Retrieve all contact requests made by this user
    const requests = await contactModel.getSentRequestsByUserId(userId);
    // Respond with requests as JSON
    res.json(requests);
  } catch (err) {
    // Log error and respond with 500 Internal Server Error
    console.error('Error fetching sent requests:', err);
    res.status(500).json({ error: 'Failed to fetch sent requests' });
  }
};

module.exports = {
  createContactRequest,
  getContactRequestsForOwner,
  acceptContactRequest,
  rejectContactRequest,
  getSentRequestsByUser,
};