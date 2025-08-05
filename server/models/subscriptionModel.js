const pool = require("../config/db")

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

    return result.rows.map((plan) => ({
      ...plan,
      price: Number.parseFloat(plan.price),
      features: typeof plan.features === "string" ? JSON.parse(plan.features) : plan.features,
    }))
  } catch (error) {
    throw error
  }
}

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
      return {
        ...subscription,
        amount_paid: Number.parseFloat(subscription.amount_paid),
      }
    }

    return null
  } catch (error) {
    throw error
  }
}

const createUserSubscription = async (userId, planId) => {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    // Get plan details
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

    // Deactivate current subscription(s)
    const deactivateQuery = `
      UPDATE user_subscriptions 
      SET is_active = false, updated_at = NOW()
      WHERE user_id = $1 AND is_active = true
    `
    await client.query(deactivateQuery, [userId])

    // Calculate expiry date
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + plan.duration_days)

    const basePrice = plan.price;
    const amountPaid = basePrice;

    // Insert new subscription manually
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
      "manual", 
      plan.price,
      plan.duration_days 
    ])

    await client.query("COMMIT")

    const subscription = subscriptionResult.rows[0]
    subscription.amount_paid = Number.parseFloat(subscription.amount_paid)

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

const cancelUserSubscription = async (userId) => {
  try {
    const query = `
      UPDATE user_subscriptions 
      SET is_active = false, updated_at = NOW()
      WHERE user_id = $1 AND is_active = true
      RETURNING *
    `
    const result = await pool.query(query, [userId])
    return result.rows.length > 0 ? result.rows[0] : null
  } catch (error) {
    throw error
  }
}

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