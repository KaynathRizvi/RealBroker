import { View, Text, Dimensions, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import statsStyles, { statColors } from "../styles/statsOverviewStyles"

// Import chart components
import ListingsPieChart from "../component/pieChart"
import RequestsBarChart from "../component/barChart"
import GaugeChart from "../component/gaugeChart"
import StackBar from "../component/stackBar"
import CustomLineChart from "../component/lineChart"

// Get server URL from Expo constants (prefers DEBUG_SERVER_URL if available)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function StatsOverview({ subscriptionExpiry }: { subscriptionExpiry: string }) {
  // Track screen width to make layout responsive
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  // Main stats object (counts, days left, etc.)
  const [stats, setStats] = useState({
    totalListings: 0,
    myListings: 0,
    receivedRequests: 0,
    sentRequests: 0,
    newThisWeek: 0,
    daysLeft: 0,
  })

  // Data for line chart (listings over time)
  const [lineData, setLineData] = useState({ labels: [], data: [] })

  // Data for stacked bar chart (requests per property)
  const [requestsData, setRequestsData] = useState<
    { property_name: string; request_count: number }[]
  >([])

  // Responsive layout flag
  const isSmallScreen = screenWidth < 600

  useEffect(() => {
    // Fetch all stats on mount
    fetchStats()

    // Update screen width on orientation/resize
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width)
    })

    // Cleanup event listener on unmount
    return () => subscription?.remove()
  }, [])

  /**
   * Fetch stats data from API and update state
   */
  const fetchStats = async () => {
    try {
      // Get token from local storage
      const token = await AsyncStorage.getItem("token")
      if (!token) return

      // 1️⃣ Fetch main stats overview
      const response = await fetch(`${SERVER_URL}/api/stats/overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()

      // 2️⃣ Fetch line chart data (listings over time)
      const lineRes = await fetch(`${SERVER_URL}/api/stats/listings-over-time`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const lineJson = await lineRes.json()

      // 3️⃣ Calculate days left in subscription from expiry date
      const expiryDate = new Date(subscriptionExpiry)
      const today = new Date()
      let daysLeft = 0

      if (!isNaN(expiryDate.getTime())) {
        daysLeft = Math.max(
          0,
          Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        )
      }

      // Update stats state
      setStats({
        totalListings: data.totalListings || 0,
        myListings: data.myListings || 0,
        receivedRequests: data.receivedRequests || 0,
        sentRequests: data.sentRequests || 0,
        newThisWeek: data.newThisWeek || 0,
        daysLeft: data.daysLeft ?? 0, // if API doesn't return, default to 0
      })

      // Update line chart data
      setLineData({
        labels: lineJson.labels || [],
        data: lineJson.data || [],
      })

      // 4️⃣ Fetch stacked bar chart data (requests per property)
      const requestsRes = await fetch(`${SERVER_URL}/api/stats/requests-per-property`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const requestsJson = await requestsRes.json()

      // Ensure data format is an array
      if (Array.isArray(requestsJson)) {
        setRequestsData(requestsJson)
      } else if (Array.isArray(requestsJson.data)) {
        setRequestsData(requestsJson.data)
      } else {
        console.error("Invalid requests-per-property response:", requestsJson)
        setRequestsData([])
      }

    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  return (
    <ScrollView style={statsStyles.container}>
      {/* Title */}
      <Text style={statsStyles.title}>📈 RealBroker Stats</Text>

      {/* Section: Stat cards */}
      <Text style={statsStyles.subtitle}>Your Stats</Text>
      <View style={statsStyles.grid}>
        <StatCard label="Total Listings" value={stats.totalListings} />
        <StatCard label="My Listings" value={stats.myListings} />
        <StatCard label="Requests Received" value={stats.receivedRequests} />
        <StatCard label="Requests Sent" value={stats.sentRequests} />
        <StatCard label="New This Week" value={stats.newThisWeek} />
        <StatCard label="Days Left" value={stats.daysLeft} />
      </View>

      {/* Subscription gauge chart */}
      <View style={statsStyles.gaugeContainer}>
        <GaugeChart daysLeft={stats.daysLeft} />
      </View>

      {/* Row 1: Line chart + bar chart */}
      <View style={[statsStyles.row, { flexDirection: isSmallScreen ? "column" : "row" }]}>
        <View style={statsStyles.lineChartContainer}>
          <CustomLineChart
            labels={lineData.labels}
            data={lineData.data}
          />
        </View>

        <View style={statsStyles.barChartContainer}>
          <RequestsBarChart
            sentRequests={stats.sentRequests}
            receivedRequests={stats.receivedRequests}
          />
        </View>
      </View>

      {/* Row 2: Stacked bar chart + pie chart */}
      <View style={[statsStyles.row, { flexDirection: isSmallScreen ? "column" : "row" }]}>
        <View style={statsStyles.stackBarContainer}>
          <StackBar data={requestsData} />
        </View>
        <View style={statsStyles.pieChartContainer}>
          <ListingsPieChart
            myListings={stats.myListings}
            totalListings={stats.totalListings}
          />
        </View>
      </View>
    </ScrollView>
  )
}

/**
 * Reusable stat card component
 */
const StatCard = ({ label, value }: { label: string; value: number }) => {
  // Pick colors for the card based on stat type
  const colorSet = statColors[label] || { text: "#007AFF", border: "#007AFF" }

  return (
    <View style={[statsStyles.card, { borderLeftColor: colorSet.border }]}>
      <Text style={[statsStyles.cardValue, { color: colorSet.text }]}>{value}</Text>
      <Text style={statsStyles.cardLabel}>{label}</Text>
    </View>
  )
}
