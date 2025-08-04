"use client"

import { useRouter } from "expo-router"
import { Text, View, Pressable } from "react-native"
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
    <Text style={styles.greeting}>👋 Welcome to Real Broker!</Text>

    <View style={styles.dashboardContainer}>
      {subscriptionInfo && (
        <Pressable onPress={() => router.push('/viewsubscription')}
        style={[styles.card, styles.subscriptionCard]}>
          <Text style={styles.cardTitle}>💳 Active Subscription</Text>
          <Text style={styles.cardText}>Plan: {subscriptionInfo.planName}</Text>
          <Text style={styles.cardText}>
            Expires on: {new Date(subscriptionInfo.expiryDate).toLocaleDateString()}
          </Text>
        </Pressable>
      )}

      <View style={[styles.card, styles.requestCard]}>
        <Text style={styles.cardTitle}>📥 Contact Requests</Text>
        <Pressable style={styles.cardButton} onPress={() => router.push('/view-requests')}>
          <Text style={styles.cardButtonText}>View Received Requests</Text>
        </Pressable>
      </View>

      <View style={[styles.card, styles.sentCard]}>
        <Text style={styles.cardTitle}>📤 Sent Requests</Text>
        <Pressable style={styles.cardButton} onPress={() => router.push('/sent-requests')}>
          <Text style={styles.cardButtonText}>View Sent Requests</Text>
        </Pressable>
      </View>
    </View>
  </View>
)
}