import { StyleSheet } from "react-native";

const viewSubscriptionStyles = StyleSheet.create({
  // Main container for the screen with padding and soft lavender-white background
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdf8ff", // soft lavender-white background
  },

  // Container for loading state, centers content vertically and horizontally
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf8ff", // same soft lavender-white background
  },

  // Background container with padding and center-aligned items horizontally
  // Note: justifyContent is removed to keep content at the top vertically
  gradientBackground: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  // Title text style with larger font, bold weight, centered, and deep pastel lavender color
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a2531ff", // deep pastel lavender
    textAlign: "center",
    marginBottom: 18,
  },

  // Card style: frosted semi-transparent white background with rounded corners and lavender border
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // frosted white
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e6d7f5", // light lavender border
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,              // Android shadow elevation
    marginTop: 10,            // space from the element above
  },

  // Row container with bottom margin for spacing between rows
  row: {
    marginBottom: 10,
  },

  // Label text styling: medium-large font size, bold, pastel lavender color
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a2531ff",       // pastel lavender
    marginBottom: 2,
  },

  // Value text styling: slightly smaller font, medium weight, pastel blue-lavender color
  valueText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#423589ff",       // pastel blue-lavender
  },
});

export default viewSubscriptionStyles;