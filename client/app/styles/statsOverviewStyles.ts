import { StyleSheet } from "react-native"

// Color mapping for different stats, used for text and border colors
export const statColors: Record<string, { text: string; border: string }> = {
  "Total Listings": { text: "#0984e3", border: "#0984e3" },       // Bright blue
  "My Listings": { text: "#6c5ce7", border: "#6c5ce7" },          // Purple
  "Requests Received": { text: "#6adadaff", border: "#6adadaff" },// Aqua
  "Requests Sent": { text: "#e17055", border: "#e17055" },        // Coral
  "New This Week": { text: "#fdcb6e", border: "#fdcb6e" },        // Yellow-orange
  "Days Left": { text: "#d63031", border: "#d63031" },            // Red
}

const statsStyles = StyleSheet.create({
  // Outer container wrapping the stats section
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  // Main title text of the stats section
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e1e1e",  // Almost black text
  },

  // Subtitle or section header text
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    color: "#2d3436",  // Dark gray text
  },

  // Grid container to arrange cards in rows and wrap as needed
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // Individual stat card container
  card: {
    backgroundColor: "#ffffff",    // White card background
    padding: 16,
    borderRadius: 12,              // Rounded corners
    width: "48%",                  // Two cards per row roughly
    marginBottom: 12,
    shadowColor: "#000",           // Subtle shadow for depth
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,                  // Android shadow
    borderLeftWidth: 4,            // Colored left border (color set dynamically)
  },

  // Large number value inside the stat card
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },

  // Label text inside the stat card (e.g. "Total Listings")
  cardLabel: {
    fontSize: 14,
    color: "#555",   // Medium gray text
    marginTop: 4,
  },

  // Row container for charts or other elements spaced horizontally
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,       // Space between child elements (supported in newer RN versions)
    marginTop: 10,
  },

  // Container style for line chart widget
  lineChartContainer: {
    backgroundColor: "#e0f7fa",  // Light cyan background
    borderRadius: 12,
    padding: 10,
    flex: 1,
  },

  // Container style for bar chart widget
  barChartContainer: {
    backgroundColor: "#fce4ec",  // Light pink background
    borderRadius: 12,
    padding: 10,
    flex: 1,
  },

  // Container style for stacked bar chart widget
  stackBarContainer: {
    backgroundColor: "#f1f8e9",  // Light green background
    borderRadius: 12,
    padding: 10,
    flex: 1.4,
    marginRight: 5,
  },

  // Container style for pie chart widget
  pieChartContainer: {
    backgroundColor: "#fff3e0",  // Light orange background
    borderRadius: 12,
    padding: 10,
    flex: 1.4,
  },

  // Container style for gauge chart widget
  gaugeContainer: {
    backgroundColor: "#ede7f6",  // Light purple background
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },

  // General chart style to apply rounded corners
  chartStyle: {
    borderRadius: 8,
  },
})

export default statsStyles