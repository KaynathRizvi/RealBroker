"use client"

import { useEffect, useState } from "react"
import { View, Text, ActivityIndicator, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { useRouter } from "expo-router"
import styles from "../styles/viewSubscriptionStyles"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function ViewSubscription() {
  const router = useRouter()
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptionInfo()
  }, [])

  const fetchSubscriptionInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        router.replace("/login")
        return
      }

      const response = await fetch(`${SERVER_URL}/api/subscription/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.status === 401) {
        await AsyncStorage.removeItem("token")
        Alert.alert("Session expired", "Please log in again.")
        router.replace("/login")
        return
      }

      const data = await response.json()

      if (data.hasActiveSubscription) {
        setSubscriptionInfo(data.subscription)
      } else {
        Alert.alert("No Active Subscription", "You don't have an active plan.")
        router.replace("/subscription")
      }
    } catch (error) {
      console.error("Error fetching subscription:", error)
      Alert.alert("Error", "Failed to load subscription info.")
    } finally {
      setLoading(false)
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
    <View style={styles.container}>
      <Text style={styles.title}>📄 My Subscription</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Plan:</Text>
        <Text style={styles.value}>{subscriptionInfo.planName}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${subscriptionInfo.planPrice}</Text>

        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.value}>{subscriptionInfo.planDuration} days</Text>

        <Text style={styles.label}>Purchase Date:</Text>
        <Text style={styles.value}>
          {new Date(subscriptionInfo.purchaseDate).toLocaleDateString()}
        </Text>

        <Text style={styles.label}>Expiry Date:</Text>
        <Text style={styles.value}>
          {new Date(subscriptionInfo.expiryDate).toLocaleDateString()}
        </Text>

      </View>
    </View>
  )
}

