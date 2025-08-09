import React, { useState, useEffect } from "react"
import { View, Text, Dimensions } from "react-native"
import { VictoryPie } from "victory-pie"
import { VictoryLegend } from "victory-legend"
import styles from "../styles/pieChartStyles"

type Props = {
  myListings: number   // Number of listings owned by the user
  totalListings: number // Total number of listings available
}

export default function ListingsPieChart({ myListings, totalListings }: Props) {
  // Track current screen width for responsive chart sizing
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const isVerySmallScreen = screenWidth <= 380 // Flag for tiny screens (e.g., older phones)

  /**
   * 📏 Listen for screen dimension changes (e.g., orientation change)
   * - Updates chart size dynamically when the device is rotated or resized
   */
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width)
    })

    return () => subscription?.remove() // Cleanup listener on unmount
  }, [])

  // Calculate "other listings" (cannot be negative)
  const otherListings = Math.max(totalListings - myListings, 0)

  /**
   * 📐 Responsive chart sizing
   * - Smaller screens → smaller chart & text
   * - Larger screens → bigger chart
   */
  const chartWidth = screenWidth < 400 ? screenWidth * 0.6 : screenWidth * 0.5
  const chartHeight = screenWidth < 400 ? 140 : 160
  const innerRadius = screenWidth < 400 ? 40 : 50
  const fontSize = screenWidth < 400 ? 16 : 12

  // Data for the pie chart
  const data = [
    { x: "My Listings", y: myListings },
    { x: "Others", y: otherListings },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 My Listings vs Total</Text>

      {/* 📊 Pie Chart - No labels inside, just a visual breakdown */}
      <VictoryPie
        data={data}
        colorScale={["#74b9ff", "#dfe6e9"]} // My Listings = Blue, Others = Light Gray
        width={chartWidth}
        height={chartHeight}
        innerRadius={innerRadius} // Creates a donut chart effect
        labels={() => null} // Disable default labels for a cleaner look
        padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
      />

      {/* 📋 Legend for showing numbers & color meaning */}
      <View style={styles.legendContainer}>
        <VictoryLegend
          orientation={isVerySmallScreen ? "vertical" : "horizontal"} // Stack vertically on small screens
          gutter={isVerySmallScreen ? 8 : 20} // Space between legend items
          itemsPerRow={isVerySmallScreen ? 1 : 2} // One per row for small screens
          data={[
            { name: `My Listings: ${myListings}`, symbol: { fill: "#74b9ff" } },
            { name: `Others: ${otherListings}`, symbol: { fill: "#dfe6e9" } },
          ]}
          style={{
            labels: { fontSize: fontSize }, // Adjust legend text size
          }}
          height={isVerySmallScreen ? 50 : 20}
        />
      </View>
    </View>
  )
}