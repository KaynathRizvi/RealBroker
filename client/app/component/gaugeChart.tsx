import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress"; // Library for progress indicators

export default function GaugeChart({
  daysLeft,
  totalDays = 30, // Default to a 30-day subscription period
}: {
  daysLeft: number; // Number of days remaining in the subscription
  totalDays?: number; // Optional total number of days in the subscription
}) {
  // Calculate progress as a ratio of days left to total days (max 1.0)
  const progress = Math.min(daysLeft / totalDays, 1);

  return (
    <View style={styles.container}>
      {/* Title text */}
      <Text style={styles.title}>⏳ Subscription Days Left</Text>

      {/* Circular progress bar */}
      <Progress.Circle
        size={140} // Diameter of the circle
        progress={progress} // Progress value (0 to 1)
        showsText // Show text inside the circle
        formatText={() => `${daysLeft}d`} // Display days left inside the circle
        thickness={10} // Thickness of the progress stroke
        color={progress < 0.3 ? "#e17055" : "#00b894"} // Red if <30% left, else green
        unfilledColor="#dfe6e9" // Background color for remaining section
        borderWidth={0} // No border around the circle
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    alignItems: "center", // Center chart horizontally
    marginVertical: 20, // Space above and below
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10, // Space between title and chart
  },
});