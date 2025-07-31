const contactModel = require('../models/contactModel');

async function createContactRequest(req, res) {
  const { property_id, name, agency, phone, email, message } = req.body;

  try {
    await contactModel.saveContactRequest({ property_id, name, agency, phone, email, message });
    res.status(201).json({ message: 'Contact request sent' });
  } catch (err) {
    console.error('Error saving contact request:', err);
    res.status(500).json({ error: 'Failed to send request' });
  }
}


// ✅ New: Fetch all contact requests for a property owner
async function getContactRequestsForOwner(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Missing user ID' });
  }

  try {
    const requests = await contactModel.getContactRequestsForOwner(userId);
    res.json(requests); // ✅ Only the controller sends the response
  } catch (err) {
    console.error('Error fetching contact requests:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function acceptContactRequest(req, res) {
  const { requestId } = req.params;
  const userId = req.user.id; // assume you extract user id from auth middleware

  try {
    // Get owner info from user_profile table by userId
    const ownerResult = await pool.query(
      'SELECT name, email, contact FROM user_profile WHERE user_id = $1',
      [userId]
    );

    if (ownerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Owner profile not found' });
    }

    const owner = ownerResult.rows[0];

    // Update contact_request with owner info and set status = 'accepted'
    await pool.query(
      `UPDATE contact_request
       SET status = 'accepted',
           owner_name = $1,
           owner_email = $2,
           owner_contact = $3
       WHERE id = $4`,
      [owner.name, owner.email, owner.contact, requestId]
    );

    res.status(200).json({ message: 'Request accepted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to accept request' });
  }
}

async function rejectContactRequest(req, res) {
  const { requestId } = req.params;

  try {
    await contactModel.rejectContactRequest(requestId);
    res.status(200).json({ message: 'Request deleted' });
  } catch (err) {
    console.error('Error rejecting request:', err);
    res.status(500).json({ error: 'Failed to reject request' });
  }
}


module.exports = {
  createContactRequest,
  getContactRequestsForOwner,
  acceptContactRequest,
  rejectContactRequest,
};
