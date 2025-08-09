import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  // Main container for the component
  container: {
    backgroundColor: "#fff",           // White background for a clean look
    borderRadius: 16,                  // Rounded corners
    paddingVertical: 16,               // Top & bottom padding inside container
    margin: 10,                         // Outer margin around the component

    // Android shadow
    elevation: 6,                       // Adds depth on Android

    // iOS shadow properties
    shadowColor: "#000",                // Shadow color (black)
    shadowOffset: { width: 0, height: 2 }, // Position of shadow
    shadowOpacity: 0.15,                // Transparency of shadow
    shadowRadius: 6,                    // How soft/blurred the shadow is
  },

  // Heading text style
  heading: {
    fontSize: 14,                       // Small-medium text
    fontWeight: "600",                  // Semi-bold weight
    color: "#2f3542",                   // Dark gray-blue text color
    textAlign: "center",                // Center-align text
    marginBottom: 10,                    // Space below heading
  },

  // Chart container style
  chart: {
    borderRadius: 12,                   // Slight rounding on chart edges
    alignSelf: "center",                 // Center horizontally inside parent
  },
})