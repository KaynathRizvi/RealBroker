"use client"

import { useRouter } from "expo-router"
import { Text, View, Pressable, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import styles from "../styles/homeStyles"
import StatsOverview from "./statsoverview"
import PercentBar from "./percentBar"

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

    // Example data, ideally fetched or passed as props
  const stats = {
    totalListings: 100,
    myListings: 50,
    receivedRequests: 20,
    sentRequests: 10,
    newThisWeek: 5,
  }

  const total = stats.totalListings || 1
  const data = [
    { label: "My Listings", value: stats.myListings },
    { label: "Requests Received", value: stats.receivedRequests },
    { label: "Requests Sent", value: stats.sentRequests },
    { label: "New This Week", value: stats.newThisWeek },
  ]

  return (
  <ScrollView style={styles.content}>
    <Text style={styles.greeting}>👋 Welcome to Real Broker!</Text>
    <Text style={styles.infoText}>
      Real Broker is your trusted platform for discovering and listing premium properties with ease.
      Whether you're a real estate agent, or investor, we provide modern tools to connect and grow your business.
    </Text>
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

      <Pressable  onPress={() => router.push('/view-requests')}>
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
          <PercentBar data={data} total={total} />
        </View>
      </Pressable>
    
    </View>
  </ScrollView>
  
)
}