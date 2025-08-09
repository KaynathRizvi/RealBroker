const pool = require("../config/db");

// Get all active subscription plans sorted by price (ascending)
const getAllSubscriptionPlans = async () => {
  try {
    const query = `
      SELECT 
        plan_id as id, 
        name, 
        CAST(price AS DECIMAL(10,2)) as price, 
        duration_days as duration, 
        features
      FROM subscription_plans 
      WHERE is_active = true
      ORDER BY price ASC
    `
    const result = await pool.query(query)

    // Parse the price as float and parse features JSON if needed
    return result.rows.map((plan) => ({
      ...plan,
      price: Number.parseFloat(plan.price),
      features: typeof plan.features === "string" ? JSON.parse(plan.features) : plan.features,
    }))
  } catch (error) {
    throw error
  }
}

// Check if a user currently has an active and valid subscription
const checkUserSubscription = async (userId) => {
  try {
    const query = `
      SELECT 
        us.*,
        sp.name as plan_name,
        sp.features,
        CAST(us.amount_paid AS DECIMAL(10,2)) as amount_paid
      FROM user_subscriptions us
      JOIN subscription_plans sp ON us.plan_id = sp.plan_id
      WHERE us.user_id = $1 
        AND us.is_active = true 
        AND us.expiry_date > NOW()
      ORDER BY us.expiry_date DESC
      LIMIT 1
    `
    const result = await pool.query(query, [userId])

    if (result.rows.length > 0) {
      const subscription = result.rows[0]
      // Convert amount_paid to float for consistency
      return {
        ...subscription,
        amount_paid: Number.parseFloat(subscription.amount_paid),
      }
    }

    // Return null if no active subscription found
    return null
  } catch (error) {
    throw error
  }
}

// Create a new subscription for a user with the specified plan
const createUserSubscription = async (userId, planId) => {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    // Fetch plan details to validate and get price/duration
    const planQuery = `
      SELECT *, CAST(price AS DECIMAL(10,2)) as price 
      FROM subscription_plans 
      WHERE plan_id = $1 AND is_active = true
    `
    const planResult = await client.query(planQuery, [planId])

    if (planResult.rows.length === 0) {
      throw new Error("Invalid plan selected")
    }

    const plan = planResult.rows[0]
    plan.price = Number.parseFloat(plan.price)

    // Deactivate any existing active subscriptions for the user
    const deactivateQuery = `
      UPDATE user_subscriptions 
      SET is_active = false, updated_at = NOW()
      WHERE user_id = $1 AND is_active = true
    `
    await client.query(deactivateQuery, [userId])

    // Calculate new expiry date based on plan duration
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + plan.duration_days)

    const basePrice = plan.price;
    const amountPaid = basePrice;

    // Insert the new subscription record
    const insertQuery = `
      INSERT INTO user_subscriptions 
      (user_id, plan_id, expiry_date, amount_paid, payment_status, plan_price, plan_duration)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `

    const subscriptionResult = await client.query(insertQuery, [
      userId,
      planId,
      expiryDate,
      amountPaid,
      "manual",  // Payment status hardcoded as 'manual'
      plan.price,
      plan.duration_days 
    ])

    await client.query("COMMIT")

    const subscription = subscriptionResult.rows[0]
    // Convert amount_paid to float for consistency
    subscription.amount_paid = Number.parseFloat(subscription.amount_paid)

    // Return the created subscription and plan details
    return {
      subscription: subscription,
      plan: plan,
    }
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

// Cancel all active subscriptions for a user (set is_active to false)
const cancelUserSubscription = async (userId) => {
  try {
    const query = `
      UPDATE user_subscriptions 
      SET is_active = false, updated_at = NOW()
      WHERE user_id = $1 AND is_active = true
      RETURNING *
    `
    const result = await pool.query(query, [userId])

    // Return the canceled subscription record or null if none found
    return result.rows.length > 0 ? result.rows[0] : null
  } catch (error) {
    throw error
  }
}

// Get the full subscription history for a user, including plan names and formatted amount paid
const getUserSubscriptionHistory = async (userId) => {
  try {
    const query = `
      SELECT 
        us.*,
        sp.name as plan_name,
        CAST(us.amount_paid AS DECIMAL(10,2)) as amount_paid
      FROM user_subscriptions us
      JOIN subscription_plans sp ON us.plan_id = sp.plan_id
      WHERE us.user_id = $1
      ORDER BY us.created_at DESC
    `
    const result = await pool.query(query, [userId])

    // Parse amount_paid as float for all records
    return result.rows.map((subscription) => ({
      ...subscription,
      amount_paid: Number.parseFloat(subscription.amount_paid),
    }))
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllSubscriptionPlans,
  checkUserSubscription,
  createUserSubscription,
  cancelUserSubscription,
  getUserSubscriptionHistory,
}