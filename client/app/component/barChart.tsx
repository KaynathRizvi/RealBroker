import React, { useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { BarChart as ChartKitBarChart } from "react-native-chart-kit";
import * as Animatable from "react-native-animatable";
import { styles } from "../styles/barChartStyles";

// Chart configuration for styling
const chartConfig = {
  backgroundGradientFrom: "#ffffff", // White background
  backgroundGradientTo: "#ffffff",   // White background (no gradient)
  color: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`, // Bar color function
  labelColor: () => "#555", // Label text color
  decimalPlaces: 0, // No decimal places in values
  barPercentage: 1.5, // Width multiplier for bars
  propsForBackgroundLines: {
    stroke: "#ddd", // Light grey grid lines
  },
};

export default function RequestsBarChart({
  sentRequests,
  receivedRequests,
}: {
  sentRequests: number;
  receivedRequests: number;
}) {
  // Tracks the width of the chart container to make the chart responsive
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure container width when layout changes
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <Animatable.View
      animation="fadeInUp" // Smooth entry animation from bottom
      duration={800} // Animation duration in ms
      style={styles.container}
      onLayout={onLayout} // Measure width when rendered
    >
      {/* Chart title */}
      <Text style={styles.heading}>📊 Engagement: Sent vs Received</Text>

      {/* Render the chart only after width is measured */}
      {containerWidth > 0 && (
        <ChartKitBarChart
          data={{
            labels: ["Sent", "Received"], // X-axis labels
            datasets: [
              {
                data: [sentRequests, receivedRequests], // Values for bars
                colors: [() => "#ff9ff3", () => "#70a1ff"], // Bar colors
              },
            ],
          }}
          width={containerWidth - 26} // ✅ Fit chart dynamically inside container
          height={280} // Chart height in px
          chartConfig={chartConfig} // Apply styling config
          verticalLabelRotation={0} // Keep labels horizontal
          fromZero // Always start Y-axis from zero
          yAxisLabel="" // No prefix for values
          yAxisSuffix="" // No suffix for values
          withInnerLines // Show horizontal grid lines
          withCustomBarColorFromData // Allow custom colors per bar
          showValuesOnTopOfBars // Display values above bars
          style={styles.chart} // Apply custom chart styling
        />
      )}
    </Animatable.View>
  );
}
