import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  // Main chart container
  container: {
    height: 350, // fixed chart height
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
    paddingVertical: 5, // small vertical padding
    paddingBottom: 0, // remove bottom padding for better fit
  },

  // Chart title style
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6, // space below title
  },

  // Legend section container
  legendContainer: {
    paddingTop: 10, // space above legend
    alignItems: "center", // 💡 centers legend horizontally
    justifyContent: "center", // centers vertically if needed
    width: "100%", // full width to align with chart
  },
})

export default styles