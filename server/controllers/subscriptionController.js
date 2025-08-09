const { getAllSubscriptionPlans, checkUserSubscription, createUserSubscription, cancelUserSubscription, getUserSubscriptionHistory } = require("../models/subscriptionModel")

// ✅ Get current user's active subscription status
const getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user.userId // Extract user ID from authenticated request
    const subscription = await checkUserSubscription(userId) // Check if user has active subscription

    if (!subscription) {
      // No active subscription found, respond accordingly
      return res.json({
        hasActiveSubscription: false,
        subscription: null,
      })
    }

    // Return subscription details if active subscription exists
    res.json({
      hasActiveSubscription: true,
      subscription: {
        id: subscription.id,
        planId: subscription.plan_id,
        planName: subscription.plan_name,
        features: subscription.features,
        planPrice: subscription.plan_price, // Price of the plan
        planDuration: subscription.plan_duration, // Duration of the plan
        purchaseDate: subscription.purchase_date,
        expiryDate: subscription.expiry_date,
        amountPaid: subscription.amount_paid,
      },
    })
  } catch (error) {
    console.error("Error checking subscription status:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Get list of all available subscription plans
const getSubscriptionPlans = async (req, res) => {
  try {
    const plans = await getAllSubscriptionPlans() // Fetch all subscription plans from model
    res.json(plans) // Return plans as JSON response
  } catch (error) {
    console.error("Error fetching plans:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Activate a subscription plan directly (no payment flow included)
const activateSubscription = async (req, res) => {
  try {
    const { planId } = req.body
    const userId = req.user.userId

    if (!planId) {
      // Require a plan ID in request body
      return res.status(400).json({ message: "Plan ID is required" })
    }

    // Call model to create a subscription for user with the selected plan
    const { subscription, plan } = await createUserSubscription(userId, planId)

    // Respond with details of the newly activated subscription
    res.json({
      success: true,
      message: "Subscription activated successfully",
      subscription: {
        id: subscription.id,
        planId: subscription.plan_id,
        planName: subscription.plan_name,
        features: subscription.features,
        planPrice: subscription.plan_price,
        planDuration: subscription.plan_duration,
        purchaseDate: subscription.purchase_date,
        expiryDate: subscription.expiry_date,
        amountPaid: subscription.amount_paid,
      },
    })
  } catch (error) {
    console.error("Error activating subscription:", error)
    res.status(500).json({ message: error.message || "Server error" })
  }
}

// ✅ Cancel the current user's active subscription
const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user.userId

    // Call model to cancel active subscription for the user
    const cancelledSubscription = await cancelUserSubscription(userId)

    if (!cancelledSubscription) {
      // If no active subscription to cancel, respond 404
      return res.status(404).json({ message: "No active subscription found" })
    }

    // Success response on cancellation
    res.json({
      success: true,
      message: "Subscription cancelled successfully",
    })
  } catch (error) {
    console.error("Error cancelling subscription:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Get subscription history (all past and present subscriptions) for current user
const getSubscriptionHistory = async (req, res) => {
  try {
    const userId = req.user.userId

    // Fetch all subscription records for the user
    const subscriptions = await getUserSubscriptionHistory(userId)

    // Map subscription records into a clean JSON format for response
    res.json({
      subscriptions: subscriptions.map((sub) => ({
        id: sub.id,
        planId: sub.plan_id,
        planName: sub.plan_name,
        planPrice: sub.plan_price,
        planDuration: sub.plan_duration,
        purchaseDate: sub.purchase_date,
        expiryDate: sub.expiry_date,
        isActive: sub.is_active,
        amountPaid: sub.amount_paid,
        paymentStatus: sub.payment_status,
      })),
    })
  } catch (error) {
    console.error("Error fetching subscription history:", error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  getSubscriptionStatus,
  getSubscriptionPlans,
  activateSubscription,
  cancelSubscription,
  getSubscriptionHistory,
}