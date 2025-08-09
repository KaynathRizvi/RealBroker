import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  // Main container wrapping the stacked bar chart
  container: {
    minWidth: "100%",       // Ensures container takes full width available
    marginVertical: 10,     // Vertical spacing around the container
    padding: 10,            // Inner padding inside container
    backgroundColor: "#ffff", // White background for clarity
    borderRadius: 12,       // Rounded corners for a smooth look
  },

  // Title text displayed above the chart
  chartTitle: {
    fontSize: 14,
    fontWeight: "bold",     // Bold for emphasis
    marginBottom: 10,       // Space below title before chart starts
    textAlign: "center",    // Centered horizontally
    color: "#004d40",       // Dark teal color for visual appeal
  },

  // Style for the chart area itself
  chart: {
    borderRadius: 8,        // Rounded corners for the chart container
  },

  // Text shown when there is no data to display in the chart
  noDataText: {
    textAlign: "center",    // Center the message horizontally
    color: "#999",          // Gray color to indicate inactive state
    marginTop: 20,          // Space above the message
    fontSize: 16,
  },
})

export default styles