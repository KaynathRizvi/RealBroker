import React, { useState, useEffect, useRef } from "react"
import { View, Text, Dimensions, ScrollView, LayoutChangeEvent } from "react-native"
import { BarChart } from "react-native-chart-kit"
import styles from "../styles/stackBarStyles"

// 🎨 Chart configuration (colors, font sizes, background styles)
const chartConfig = {
  backgroundGradientFrom: "#e0f7fa", // Top background color
  backgroundGradientTo: "#b2ebf2",   // Bottom background color
  decimalPlaces: 0,                  // Show only whole numbers
  color: (opacity = 1) => `rgba(0, 96, 100, ${opacity})`, // Bar color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
  barPercentage: 0.6,                // Adjust bar width
  propsForBackgroundLines: {
    strokeDasharray: "",             // Solid background grid lines
    stroke: "#ccc",                   // Grid line color
  },
  propsForLabels: {
    fontSize: 8,                      // Keep labels small for space efficiency
  },
}

type Props = {
  data: {
    property_name: string
    request_count: number
  }[]
}

export default function StackBar({ data }: Props) {
  const [containerWidth, setContainerWidth] = useState(0) // Tracks parent container width
  const scrollViewRef = useRef<ScrollView>(null) // Ref for horizontal scrolling

  /**
   * 📏 Measures the chart container width whenever layout changes
   * - Helps determine if chart should scroll horizontally
   */
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  // ✂️ Shorten long property names to 8 characters (adds "…" if truncated)
  const labels = data.map((item) =>
    item.property_name.length > 8
      ? item.property_name.slice(0, 8) + "…"
      : item.property_name
  )

  // 📊 Extract request counts
  const values = data.map((item) => item.request_count)

  // 📐 Calculate total chart width (ensure enough space for all bars)
  const barWidth = 60 // Width per bar
  const chartWidth = Math.max(labels.length * barWidth, containerWidth)

  /**
   * 🔄 Auto-scroll to the end when the chart updates
   * - Makes newest properties visible without user scrolling
   */
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [labels, values])

  /**
   * 🚫 If there's no data, show a friendly message instead of an empty chart
   */
  if (!data || data.length === 0) {
    return (
      <View onLayout={onLayout} style={styles.container}>
        <Text style={styles.chartTitle}>🏘️ Requests per Property</Text>
        <Text style={styles.noDataText}>No request data available.</Text>
      </View>
    )
  }

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Text style={styles.chartTitle}>🏘️ Requests per Property</Text>

      {/* 📜 Horizontal scroll in case chart is wider than the screen */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{ paddingHorizontal: 12 }}
        ref={scrollViewRef}
      >
        <BarChart
          data={{
            labels,                  // Shortened property names
            datasets: [{ data: values }], // Request counts
          }}
          width={chartWidth}          // Ensure all bars fit
          height={280}                // Chart height in px
          chartConfig={chartConfig}   // Styles/colors
          fromZero                    // Start Y-axis from 0
          verticalLabelRotation={0}   // Keep labels horizontal
          yAxisLabel=""               // No prefix
          yAxisSuffix=""              // No suffix
          showBarTops                  // Keep bar tops visible
          withHorizontalLabels         // Show Y-axis labels
          withInnerLines               // Show grid lines
          withVerticalLabels            // Show X-axis labels
          style={styles.chart}         // Custom styles
        />
      </ScrollView>
    </View>
  )
}