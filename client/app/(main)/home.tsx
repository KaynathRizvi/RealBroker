import { useRouter } from "expo-router"
import { Text, View, Pressable, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import styles from "../styles/homeStyles"
import { LinearGradient } from "expo-linear-gradient"

// Determine server URL from Expo config
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function HomePage() {
  const router = useRouter()

  // Local states
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null) // Stores active subscription details
  const [stats, setStats] = useState<any>(null) // Stores stats overview
  const [userName, setUserName] = useState<string | null>(null) // Stores logged-in user's name
  const [properties, setProperties] = useState<any[]>([]) // Stores all properties
  const [loadingProperties, setLoadingProperties] = useState(true) // Loading state for property fetch

  // Fetch all required data on mount
  useEffect(() => {
    fetchSubscriptionInfo()
    fetchStats()
    fetchUserProfile()
    fetchProperties()
  }, [])

  /**
   * Fetch the logged-in user's profile
   */
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        // If no token, redirect to login
        router.replace("/login")
        return
      }

      const response = await fetch(`${SERVER_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUserName(data.name || null)
      } else {
        console.warn("Failed to fetch user profile")
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  /**
   * Fetch subscription status & details
   */
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

  /**
   * Fetch stats overview (total listings, requests, etc.)
   */
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

  /**
   * Fetch all properties for the featured section
   */
  const fetchProperties = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/property/all`)
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoadingProperties(false)
    }
  }

  return (
    // Background gradient
    <LinearGradient colors={["#e0f2fe", "#edd6e3ff"]} style={{ flex: 1 }}>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Greeting */}
        <Text style={styles.greeting}>
          👋 Welcome,
          {userName && <Text style={styles.userName}> {userName} </Text>}
          to Real Broker!
        </Text>

        {/* Introductory text */}
        <Text style={styles.infoText}>
          Real Broker is your trusted platform for discovering and listing premium properties with ease.
          Whether you're a real estate agent, or investor, we provide modern tools to connect and grow your business.
        </Text>

        <View style={styles.dashboardContainer}>
          {/* Active subscription card */}
          {subscriptionInfo && (
            <Pressable
              onPress={() => router.push('/viewsubscription')}
              style={[styles.card, styles.subscriptionCard]}
            >
              <Text style={styles.cardTitle}>💳 Active Subscription</Text>
              <Text style={styles.cardText}>Plan: {subscriptionInfo.planName}</Text>
              <Text style={styles.cardText}>
                Expires on: {new Date(subscriptionInfo.expiryDate).toLocaleDateString()}
              </Text>
            </Pressable>
          )}

          {/* View received contact requests */}
          <Pressable onPress={() => router.push('/view-requests')}>
            <View style={[styles.card, styles.requestCard]}>
              <Text style={styles.cardTitle}>📥 Contact Requests</Text>
              <Text style={styles.cardSubtitle}>
                See all requests received for your listings
              </Text>
            </View>
          </Pressable>

          {/* View sent contact requests */}
          <Pressable onPress={() => router.push('/sent-requests')}>
            <View style={[styles.card, styles.sentCard]}>
              <Text style={styles.cardTitle}>📤 Sent Requests</Text>
              <Text style={styles.cardSubtitle}>
                View requests you've sent to property owners.
              </Text>
            </View>
          </Pressable>

          {/* View statistics overview */}
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

          {/* Featured properties section */}
          <View style={[styles.card, styles.propertyCard]}>
            <Text style={[styles.cardTitle, { marginLeft: 16, marginBottom: 12 }]}>
              🏘️ Featured Properties
            </Text>

            {/* Show loader until properties are fetched */}
            {loadingProperties ? (
              <ActivityIndicator size="large" color="#8b5cf6" style={{ marginVertical: 20 }} />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              >
                {properties.map((property) => (
                  <TouchableOpacity
                    key={property.id}
                    onPress={() => {
                      // Navigate to property details page
                      if (property.id != null) {
                        router.push({
                          pathname: "/(main)/propertyDetail",
                          params: { id: property.id.toString() },
                        })
                      }
                    }}
                    style={{ marginRight: 16, width: 250 }}
                  >
                    <View style={styles.propertyItemCard}>
                      {/* Property images horizontal scroll */}
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginBottom: 8 }}
                      >
                        {property.property_pic_url?.map((url, index) => (
                          <Image
                            key={index}
                            source={{ uri: url }}
                            style={{ width: 230, height: 140, borderRadius: 8, marginRight: 8 }}
                            resizeMode="cover"
                          />
                        ))}
                      </ScrollView>

                      {/* Property info */}
                      <Text style={styles.title}>{property.property_name}</Text>
                      <Text style={styles.detail}>
                        Deal Price: ₹{property.deal_price ?? 'Not specified'}
                      </Text>
                      <Text style={styles.email}>Owner: {property.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
