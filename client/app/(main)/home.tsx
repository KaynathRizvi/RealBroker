"use client"

import { Stack, useRouter } from "expo-router"
import { Text, View } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import styles from "../styles/homeStyles"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function HomePage() {
  const router = useRouter()
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null)

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

      const data = await response.json()

      if (data.hasActiveSubscription) {
        setSubscriptionInfo(data.subscription)
      }
    } catch (error) {
      console.error("Error fetching subscription:", error)
    }
  }

  return (
    <View style={styles.content}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Welcome to BrokerApp Home Page!
      </Text>

      {subscriptionInfo && (
        <View
          style={{
            backgroundColor: "#e8f5e8",
            padding: 15,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2d5a2d" }}>
            Active Subscription: {subscriptionInfo.planName}
          </Text>
          <Text style={{ color: "#2d5a2d" }}>
            Expires: {new Date(subscriptionInfo.expiryDate).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  )
}