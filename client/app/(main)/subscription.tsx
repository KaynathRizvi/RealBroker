"use client"

import { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import styles from "../styles/subscriptionStyles"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

type SubscriptionPlan = {
  id: string
  name: string
  price: number
  duration: number
  features: string[]
}

export default function SubscriptionPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSubscriptionAndFetchPlans()
  }, [])

  const checkSubscriptionAndFetchPlans = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        router.replace("/login")
        return
      }

      // ✅ Check subscription status first
      const statusRes = await fetch(`${SERVER_URL}/api/subscription/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const statusData = await statusRes.json()

      if (statusData.hasActiveSubscription) {
        // If already subscribed, redirect to home
        router.replace("/home")
        return
      }

      // ✅ Fetch available plans
      const plansRes = await fetch(`${SERVER_URL}/api/subscription/plans`)
      if (!plansRes.ok)
        throw new Error(`HTTP error! status: ${plansRes.status}`)

      const planData = await plansRes.json()
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
      setLoading(false)
    }
  }

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
      router.push("/home") // ✅ Go to home after activation
    } catch (error: any) {
      console.error("Error activating plan:", error)
      Alert.alert("Error", error.message || "Subscription activation failed.")
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Choose a Subscription Plan</Text>
      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planPrice}>
            ${plan.price} / {plan.duration} days
          </Text>
          {plan.features.map((feature, index) => (
            <Text key={index} style={styles.planFeature}>
              • {feature}
            </Text>
          ))}
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
