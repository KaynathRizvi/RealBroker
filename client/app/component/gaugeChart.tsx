// components/gaugeChart.tsx

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import * as Progress from "react-native-progress"

export default function GaugeChart({
  daysLeft,
  totalDays = 30,
}: {
  daysLeft: number
  totalDays?: number
}) {
  const progress = Math.min(daysLeft / totalDays, 1)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏳ Subscription Days Left</Text>
      <Progress.Circle
        size={140}
        progress={progress}
        showsText
        formatText={() => `${daysLeft}d`}
        thickness={10}
        color={progress < 0.3 ? "#e17055" : "#00b894"}
        unfilledColor="#dfe6e9"
        borderWidth={0}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
})
