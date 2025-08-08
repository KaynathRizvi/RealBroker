import { useRouter } from "expo-router"
import { Text, View, Pressable, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import styles from "../styles/homeStyles"
import { LinearGradient } from "expo-linear-gradient"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function HomePage() {
  const router = useRouter()
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [userName, setUserName] = useState<string | null>(null);
  const [properties, setProperties] = useState<any[]>([])
  const [loadingProperties, setLoadingProperties] = useState(true)

  useEffect(() => {
    fetchSubscriptionInfo()
    fetchStats()
    fetchUserProfile()
    fetchProperties()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
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
    <LinearGradient colors={["#e0f2fe", "#edd6e3ff"]} style={{ flex: 1 }}>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.greeting}>
          👋 Welcome,
          {userName && <Text style={styles.userName}> {userName} </Text>}
          to Real Broker!
        </Text>

        <Text style={styles.infoText}>
          Real Broker is your trusted platform for discovering and listing premium properties with ease.
          Whether you're a real estate agent, or investor, we provide modern tools to connect and grow your business.
        </Text>

        <View style={styles.dashboardContainer}>
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

          {/* Properties Horizontal Scroll Section */}
          {/* Properties Horizontal Scroll Section */}
          <View style={[styles.card, styles.propertyCard]}>
            <Text style={[styles.cardTitle, { marginLeft: 16, marginBottom: 12 }]}>
              🏘️ Featured Properties
            </Text>

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
