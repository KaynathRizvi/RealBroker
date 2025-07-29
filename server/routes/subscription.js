const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  getSubscriptionStatus,
  getSubscriptionPlans,
  activateSubscription,
  cancelSubscription,
  getSubscriptionHistory,
} = require("../controllers/subscriptionController")

// Get user's current subscription status
router.get("/status", protect, getSubscriptionStatus)

// Get available subscription plans
router.get("/plans", getSubscriptionPlans)

// Activate a plan (without payment)
router.post("/activate", protect, activateSubscription)

// Cancel subscription
router.post("/cancel", protect, cancelSubscription)

// Get subscription history
router.get("/history", protect, getSubscriptionHistory)

module.exports = router