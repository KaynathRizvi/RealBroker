import { StyleSheet } from "react-native";

// Styles for the chart display component
export const styles = StyleSheet.create({
  // Container for the chart card
  chartContainer: {
    marginVertical: 16,                 // Space above and below
    padding: 16,                         // Inner padding
    backgroundColor: '#ffffff',          // White background for contrast
    borderRadius: 16,                    // Rounded corners
    shadowColor: '#000',                  // iOS shadow color
    shadowOffset: { width: 0, height: 2 },// Slight drop shadow
    shadowOpacity: 0.1,                   // Light shadow visibility
    shadowRadius: 6,                      // Soft shadow blur
    elevation: 3,                         // Android shadow depth
  },

  // Title text above the chart
  chartTitle: {
    fontSize: 14,                         // Small-medium font size
    fontWeight: '600',                    // Semi-bold for emphasis
    marginBottom: 8,                      // Space below title
    textAlign: 'center',                  // Centered title
    color: '#0288d1',                     // Bright blue accent color
  },
});