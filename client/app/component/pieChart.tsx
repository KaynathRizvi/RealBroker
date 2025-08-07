import React, { useState, useEffect } from "react"
import { View, Text, Dimensions } from "react-native"
import { VictoryPie } from "victory-pie"
import { VictoryLegend } from "victory-legend"
import styles from "../styles/pieChartStyles"

type Props = {
  myListings: number
  totalListings: number
}

export default function ListingsPieChart({ myListings, totalListings }: Props) {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const isVerySmallScreen = screenWidth <= 380

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width)
    })

    return () => subscription?.remove()
  }, [])

  const otherListings = Math.max(totalListings - myListings, 0)

  // Dynamically adjust chart size
  const chartWidth = screenWidth < 400 ? screenWidth * 0.6 : screenWidth * 0.5
  const chartHeight = screenWidth < 400 ? 140 : 160
  const innerRadius = screenWidth < 400 ? 40 : 50
  const fontSize = screenWidth < 400 ? 16 : 12

  const data = [
    { x: "My Listings", y: myListings },
    { x: "Others", y: otherListings },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 My Listings vs Total</Text>

      <VictoryPie
        data={data}
        colorScale={["#74b9ff", "#dfe6e9"]}
        width={chartWidth}
        height={chartHeight}
        innerRadius={innerRadius}
        labels={() => null}
        padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <View style={styles.legendContainer}>
        <VictoryLegend
          orientation={isVerySmallScreen ? "vertical" : "horizontal"}
          gutter={isVerySmallScreen ? 8 : 20}
          itemsPerRow={isVerySmallScreen ? 1 : 2}
          data={[
            { name: `My Listings: ${myListings}`, symbol: { fill: "#74b9ff" } },
            { name: `Others: ${otherListings}`, symbol: { fill: "#dfe6e9" } },
          ]}
          style={{
            labels: { fontSize: fontSize },
          }}
            height={isVerySmallScreen ? 50 : 20}
          />
      </View>
    </View>
  )
}
