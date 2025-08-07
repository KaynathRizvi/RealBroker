"use client"

import { useRouter } from "expo-router"
import { Text, View, Pressable, ScrollView } from "react-native"
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
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetchSubscriptionInfo()
    fetchStats()
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

  const fetchStats = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) return

      const response = await fetch(`${SERVER_URL}/api/stats/overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  return (
    <ScrollView style={styles.content}>
      <Text style={styles.greeting}>👋 Welcome to Real Broker!</Text>
      <Text style={styles.infoText}>
        Real Broker is your trusted platform for discovering and listing premium properties with ease.
        Whether you're a real estate agent, or investor, we provide modern tools to connect and grow your business.
      </Text>

      <View style={styles.dashboardContainer}>
        {subscriptionInfo && (
          <Pressable onPress={() => router.push('/viewsubscription')} style={[styles.card, styles.subscriptionCard]}>
            <Text style={styles.cardTitle}>💳 Active Subscription</Text>
            <Text style={styles.cardText}>Plan: {subscriptionInfo.planName}</Text>
            <Text style={styles.cardText}>
              Expires on: {new Date(subscriptionInfo.expiryDate).toLocaleDateString()}
            </Text>
          </Pressable>
        )}

        <Pressable onPress={() => router.push('/view-requests')}>
          <View style={[styles.card, styles.requestCard]}>
            <Text style={styles.cardTitle}>📥 Contact Requests</Text>
            <Text style={styles.cardSubtitle}>
              See all requests received for your listings
            </Text>      
          </View>
        </Pressable>

        <Pressable onPress={() => router.push('/sent-requests')}>
          <View style={[styles.card, styles.sentCard]}>
            <Text style={styles.cardTitle}>📤 Sent Requests</Text>
            <Text style={styles.cardSubtitle}>
              View requests you've sent to property owners.
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => router.push("/statsOverview")}>
          <View style={[styles.card, styles.statsCard]}>
            <Text style={styles.cardTitle}>📊 View Stats</Text>

            {stats ? (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.cardSubtitle}>🏘️ Total Listings: {stats.totalListings}</Text>
                <Text style={styles.cardSubtitle}>📥 Requests: {stats.receivedRequests}</Text>
                <Text style={styles.cardSubtitle}>🆕 New This Week: {stats.newThisWeek}</Text>
              </View>
            ) : (
              <Text style={styles.cardSubtitle}>Loading stats...</Text>
            )}
          </View>
        </Pressable>
      </View>
    </ScrollView>
  )
}
