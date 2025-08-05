const {
  getAllSubscriptionPlans,
  checkUserSubscription,
  createUserSubscription,
  cancelUserSubscription,
  getUserSubscriptionHistory,
} = require("../models/subscriptionModel")

// ✅ Get current user's subscription status
const getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user.userId
    const subscription = await checkUserSubscription(userId)

    if (!subscription) {
      return res.json({
        hasActiveSubscription: false,
        subscription: null,
      })
    }

    res.json({
      hasActiveSubscription: true,
      subscription: {
        id: subscription.id,
        planId: subscription.plan_id,
        planName: subscription.plan_name,
        features: subscription.features,
        planPrice: subscription.plan_price, // <-- updated field
        planDuration: subscription.plan_duration, 
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

// ✅ Get list of available plans
const getSubscriptionPlans = async (req, res) => {
  try {
    const plans = await getAllSubscriptionPlans()
    res.json(plans)
  } catch (error) {
    console.error("Error fetching plans:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Directly activate plan (no payment)
const activateSubscription = async (req, res) => {
  try {
    const { planId } = req.body
    const userId = req.user.userId

    if (!planId) {
      return res.status(400).json({ message: "Plan ID is required" })
    }

    const { subscription, plan } = await createUserSubscription(userId, planId)

    res.json({
      success: true,
      message: "Subscription activated successfully",
      subscription: {
        id: subscription.id,
        planId: subscription.plan_id,
        planName: subscription.plan_name,
        features: subscription.features,
        planPrice: subscription.plan_price, // <-- updated field
        planDuration: subscription.plan_duration, // <-- updated field
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

// ✅ Cancel user’s subscription
const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user.userId

    const cancelledSubscription = await cancelUserSubscription(userId)

    if (!cancelledSubscription) {
      return res.status(404).json({ message: "No active subscription found" })
    }

    res.json({
      success: true,
      message: "Subscription cancelled successfully",
    })
  } catch (error) {
    console.error("Error cancelling subscription:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Get subscription history for current user
const getSubscriptionHistory = async (req, res) => {
  try {
    const userId = req.user.userId

    const subscriptions = await getUserSubscriptionHistory(userId)

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