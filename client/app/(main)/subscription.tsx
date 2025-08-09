import { useEffect, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import styles from "../styles/subscriptionStyles"

// Base API URL (Uses debug or production depending on environment variables)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

// Define the type for a subscription plan
type SubscriptionPlan = {
  id: string
  name: string
  price: number
  duration: number
  features: string[]
}

export default function SubscriptionPage() {
  const router = useRouter()
  
  // Subscription plans fetched from the server
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  
  // Loading state for when fetching subscription status/plans
  const [loading, setLoading] = useState(true)

  // Run on mount to check subscription and fetch available plans
  useEffect(() => {
    checkSubscriptionAndFetchPlans()
  }, [])

  /**
   * Check if the user already has an active subscription.
   * If yes → redirect to home
   * If not → fetch available subscription plans
   */
  const checkSubscriptionAndFetchPlans = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        // No token → send to login page
        router.replace("/login")
        return
      }

      // 🔹 Step 1: Check subscription status
      const statusRes = await fetch(`${SERVER_URL}/api/subscription/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (statusRes.status === 401) {
        // Token is invalid/expired → clear it and send to login
        await AsyncStorage.removeItem("token")
        Alert.alert("Session expired", "Please log in again.")
        router.replace("/login")
        return
      }

      const statusData = await statusRes.json()

      if (statusData.hasActiveSubscription) {
        // User already subscribed → send to home
        router.replace("/home")
        return
      }

      // 🔹 Step 2: Fetch available subscription plans
      const plansRes = await fetch(`${SERVER_URL}/api/subscription/plans`)
      if (!plansRes.ok)
        throw new Error(`HTTP error! status: ${plansRes.status}`)

      const planData = await plansRes.json()

      // Normalize plans: ensure price is a number & features are an array
      const processedPlans = planData.map((plan: any) => ({
        ...plan,
        price:
          typeof plan.price === "string"
            ? Number.parseFloat(plan.price)
            : plan.price,
        features: Array.isArray(plan.features)
          ? plan.features
          : JSON.parse(plan.features || "[]"),
      }))

      setPlans(processedPlans)
    } catch (error) {
      console.error("Error:", error)
      Alert.alert("Error", "Failed to load subscription info.")
    } finally {
      setLoading(false) // Hide loader
    }
  }

  /**
   * Activate a subscription plan
   */
  const activatePlan = async (planId: string) => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        Alert.alert("Error", "No authentication token found. Please log in again.")
        return
      }

      const response = await fetch(`${SERVER_URL}/api/subscription/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to activate subscription.")
      }

      Alert.alert("Success", "Subscription activated successfully!")
      router.push("/home") // Go to home after activation
    } catch (error: any) {
      console.error("Error activating plan:", error)
      Alert.alert("Error", error.message || "Subscription activation failed.")
    }
  }

  // Show loading spinner while fetching plans
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a Subscription Plan</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          {/* Plan Title & Price */}
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planPrice}>
            ${plan.price} / {plan.duration} days
          </Text>

          {/* Features List */}
          {plan.features.map((feature, index) => (
            <Text key={index} style={styles.planFeature}>
              • {feature}
            </Text>
          ))}

          {/* Activate Button */}
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => activatePlan(plan.id)}
          >
            <Text style={styles.subscribeButtonText}>Activate</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}