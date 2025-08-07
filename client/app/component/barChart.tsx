import React, { useState } from "react"
import { View, Text, LayoutChangeEvent } from "react-native"
import { BarChart as ChartKitBarChart } from "react-native-chart-kit"
import * as Animatable from "react-native-animatable"
import { styles } from "../styles/barChartStyles"

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`,
  labelColor: () => "#555",
  decimalPlaces: 0,
  barPercentage: 1.5,
  propsForBackgroundLines: {
    stroke: "#ddd",
  },
}

export default function RequestsBarChart({
  sentRequests,
  receivedRequests,
}: {
  sentRequests: number
  receivedRequests: number
}) {
  const [containerWidth, setContainerWidth] = useState(0)

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  return (
    <Animatable.View animation="fadeInUp" duration={800} style={styles.container} onLayout={onLayout}>
      <Text style={styles.heading}>📊 Engagement: Sent vs Received</Text>

      {containerWidth > 0 && (
        <ChartKitBarChart
          data={{
            labels: ["Sent", "Received"],
            datasets: [
              {
                data: [sentRequests, receivedRequests],
                colors: [() => "#ff9ff3", () => "#70a1ff"],
              },
            ],
          }}
          width={containerWidth - 26} // ✅ Dynamic width, no hardcoded value
          height={280}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          withInnerLines
          withCustomBarColorFromData
          showValuesOnTopOfBars
          style={styles.chart}
        />
      )}
    </Animatable.View>
  )
}
