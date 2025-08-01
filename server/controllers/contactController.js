const contactModel = require('../models/contactModel');

async function createContactRequest(req, res) {
  const { property_id, name, agency, phone, email, message } = req.body;
  const userId = req.user?.userId;
  console.log('Decoded JWT:', req.user);

  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await contactModel.saveContactRequest({ property_id, name, agency, phone, email, message, userId, });
    res.status(201).json({ message: 'Contact request sent' });
  } catch (err) {
    console.error('Error saving contact request:', err);
    res.status(500).json({ error: 'Failed to send request' });
  }
}

async function getContactRequestsForOwner(req, res) {
  const userId = req.user.userId;

  try {
    const requests = await contactModel.getContactRequestsForOwner(userId);
    res.json(requests);
  } catch (err) {
    console.error('Error fetching contact requests:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function acceptContactRequest(req, res) {
  const { requestId } = req.params;
  const userId = req.user.userId;

  try {
    await contactModel.acceptContactRequestById(requestId, userId);
    res.status(200).json({ message: 'Request accepted' });
  } catch (err) {
    console.error('Error accepting request:', err.message);
    res.status(500).json({ error: err.message || 'Failed to accept request' });
  }
}

async function rejectContactRequest(req, res) {
  const { requestId } = req.params;

  try {
    await contactModel.rejectContactRequestById(requestId);
    res.status(200).json({ message: 'Request deleted' });
  } catch (err) {
    console.error('Error rejecting request:', err);
    res.status(500).json({ error: 'Failed to reject request' });
  }
}

const getSentRequestsByUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const requests = await contactModel.getSentRequestsByUserId(userId);
    res.json(requests);
  } catch (err) {
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
