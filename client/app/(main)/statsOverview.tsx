"use client"

import { View, Text, Dimensions, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import statsStyles, { statColors } from "../styles/statsOverviewStyles"
import ListingsPieChart from "../component/pieChart"
import RequestsBarChart from "../component/barChart"
import GaugeChart from "../component/gaugeChart"
import StackBar from "../component/stackBar"
import CustomLineChart from "../component/lineChart"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function StatsOverview({ subscriptionExpiry }: { subscriptionExpiry: string }) {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const [stats, setStats] = useState({
    totalListings: 0,
    myListings: 0,
    receivedRequests: 0,
    sentRequests: 0,
    newThisWeek: 0,
    daysLeft: 0,
  })
  const [lineData, setLineData] = useState({ labels: [], data: [] })
  const [requestsData, setRequestsData] = useState<
    { property_name: string; request_count: number }[]
  >([])

  const isSmallScreen = screenWidth < 600

  useEffect(() => {
    fetchStats()

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width)
    })

    return () => subscription?.remove()
  }, [])

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

      const lineRes = await fetch(`${SERVER_URL}/api/stats/listings-over-time`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const lineJson = await lineRes.json()

      const expiryDate = new Date(subscriptionExpiry)
      const today = new Date()
      let daysLeft = 0

      if (!isNaN(expiryDate.getTime())) {
        daysLeft = Math.max(
          0,
          Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        )
      }

      setStats({
        totalListings: data.totalListings || 0,
        myListings: data.myListings || 0,
        receivedRequests: data.receivedRequests || 0,
        sentRequests: data.sentRequests || 0,
        newThisWeek: data.newThisWeek || 0,
        daysLeft: data.daysLeft ?? 0,
      })

      setLineData({
        labels: lineJson.labels || [],
        data: lineJson.data || [],
      })

      const requestsRes = await fetch(`${SERVER_URL}/api/stats/requests-per-property`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const requestsJson = await requestsRes.json()
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
      <Text style={statsStyles.title}>📈 RealBroker Stats</Text>

      {/* Stat Cards */}
      <Text style={statsStyles.subtitle}>Your Stats</Text>
      <View style={statsStyles.grid}>
        <StatCard label="Total Listings" value={stats.totalListings} />
        <StatCard label="My Listings" value={stats.myListings} />
        <StatCard label="Requests Received" value={stats.receivedRequests} />
        <StatCard label="Requests Sent" value={stats.sentRequests} />
        <StatCard label="New This Week" value={stats.newThisWeek} />
        <StatCard label="Days Left" value={stats.daysLeft} />
      </View>

      {/* Row 3: Gauge */}
      <View style={statsStyles.gaugeContainer}>
        <GaugeChart daysLeft={stats.daysLeft} />
      </View>

      {/* Row 1: Line & Bar Chart */}
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

      {/* Row 2: StackBar & Pie */}
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

const StatCard = ({ label, value }: { label: string; value: number }) => {
  const colorSet = statColors[label] || { text: "#007AFF", border: "#007AFF" }

  return (
    <View style={[statsStyles.card, { borderLeftColor: colorSet.border }]}>
      <Text style={[statsStyles.cardValue, { color: colorSet.text }]}>{value}</Text>
      <Text style={statsStyles.cardLabel}>{label}</Text>
    </View>
  )
}
