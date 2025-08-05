"use client"

import { View, Text, Dimensions, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { PieChart } from "react-native-chart-kit"
import statsStyles, { statColors } from "../styles/statsOverviewStyles"
import PercentBars from "./percentBar"

const screenWidth = Dimensions.get("window").width

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function StatsOverview({ subscriptionExpiry }: { subscriptionExpiry: string }) {
  const [stats, setStats] = useState({
    totalListings: 0,
    myListings: 0,
    receivedRequests: 0,
    sentRequests: 0,
    newThisWeek: 0,
    daysLeft: 0,
  })

  useEffect(() => {
    fetchStats()
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
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#f0f0f0",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: () => "#333",
    decimalPlaces: 0,
  }

  const pieChartData = [
    {
      name: "My Listings",
      population: stats.myListings,
      color: "#a29bfe",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Requests Sent",
      population: stats.sentRequests,
      color: "#e17055",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Requests Received",
      population: stats.receivedRequests,
      color: "#55efc4",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "New This Week",
      population: stats.newThisWeek,
      color: "#ffeaa7",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ]

  const total = stats.totalListings || 1 // prevent division by zero

  return (
    <ScrollView style={statsStyles.container}>
      <Text style={statsStyles.title}>📈 RealBroker Stats</Text>

      {/* Pie Chart */}
      <Text style={statsStyles.subtitle}>Distribution</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        absolute
        style={{ marginVertical: 10 }}
      />

      {/* Percent Bars */}
      <Text style={statsStyles.subtitle}>Percent Contributions</Text>
        <PercentBars data={[
            { label: "My Listings", value: stats.myListings },
            { label: "Requests Received", value: stats.receivedRequests },
            { label: "Requests Sent", value: stats.sentRequests },
            { label: "New This Week", value: stats.newThisWeek },
        ]}
        total={total}
        />

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


