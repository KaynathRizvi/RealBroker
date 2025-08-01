const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// POST new contact request
router.post('/', protect, contactController.createContactRequest);

// GET all contact requests for owner
router.get('/owner/requests/', protect, contactController.getContactRequestsForOwner);

// Accept a contact request by requestId
router.put('/owner/requests/:requestId/accept', protect, contactController.acceptContactRequest);

// Reject (delete) a contact request by requestId
router.delete('/owner/requests/:requestId/reject', protect, contactController.rejectContactRequest);

router.get('/sent-requests/', protect, contactController.getSentRequestsByUser);

module.exports = router;
