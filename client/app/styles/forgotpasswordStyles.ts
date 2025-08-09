import { StyleSheet } from "react-native";

const forgotPasswordStyles = StyleSheet.create({
  // Main container for the Forgot Password screen
  container: {
    flex: 1,                      // Take up full screen height
    justifyContent: "center",     // Center vertically
    alignItems: "center",         // Center horizontally
    paddingHorizontal: 16,        // Space on the left/right
    paddingVertical: 24,          // Space on the top/bottom
  },

  // Box containing the form inputs and buttons
  formBox: {
    backgroundColor: "#ffffffee", // Semi-transparent white for subtle depth
    borderRadius: 16,             // Rounded corners
    padding: 24,                  // Inner spacing
    shadowColor: "#000",          // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // Slight downward shadow
    shadowOpacity: 0.1,           // Light shadow opacity
    shadowRadius: 8,              // Blurred shadow edges
    elevation: 6,                 // Android shadow depth
    maxWidth: 400,                 // Restrict form width for larger screens
    width: "100%",                 // Full width on smaller devices
    alignSelf: "center",           // Center horizontally
  },

  // Title text at the top
  title: {
    fontSize: 26,                 // Large text
    fontWeight: "bold",           // Bold weight
    marginBottom: 32,              // Space below title
    textAlign: "center",           // Centered horizontally
    color: "#2b2542ff",            // Dark slate color
    fontFamily: "Nunito",          // Clean sans-serif font
  },

  // Input fields for email or password
  input: {
    borderWidth: 1,               // Border around input
    borderColor: '#e9d5ff',       // Light pastel lavender border
    marginBottom: 16,             // Space below each input
    paddingVertical: 14,          // Vertical padding inside input
    paddingHorizontal: 16,        // Horizontal padding inside input
    borderRadius: 12,             // Rounded corners
    fontSize: 16,                  // Comfortable reading size
    fontFamily: 'Nunito',          // Consistent typography
    backgroundColor: '#f5f3ff',   // Soft lavender background
    shadowColor: '#d8b4fe',       // Subtle lavender shadow
    shadowOffset: { width: 0, height: 1 }, // Slight depth
    shadowOpacity: 0.08,          // Very soft shadow
    shadowRadius: 3,              // Light blur
    elevation: 2,                 // Android shadow
  },

  // Button container styling
  button: {
    backgroundColor: '#f5f3ff',   // Light lavender background
    borderColor: '#e9d5ff',       // Pastel lavender border
    borderWidth: 1,               // Border around button
    paddingVertical: 14,          // Vertical padding inside button
    borderRadius: 12,             // Rounded corners
    marginTop: 8,                  // Space above the button
    alignItems: 'center',         // Center text horizontally
    shadowColor: '#d8b4fe',       // Lavender shadow
    shadowOffset: { width: 0, height: 2 }, // Soft downward shadow
    shadowOpacity: 0.1,           // Light opacity
    shadowRadius: 4,              // Gentle blur
    elevation: 2,                 // Android shadow
  },

  // Button text style
  buttonText: {
    color: '#8b5cf6',             // Rich lavender for contrast
    fontSize: 16,                  // Readable size
    fontFamily: 'NunitoBold',     // Bold version of Nunito font
  },

  // Error message text
  message: {
    color: "red",                  // Red for errors
    fontFamily: "Nunito",          // Consistent typography
    fontSize: 16,                   // Medium size
    marginBottom: 10,               // Space below message
    textAlign: "center",           // Center align
  },

  // Success message text
  success: {
    color: "#16a34a",              // Green (success color)
    fontSize: 14,                   // Slightly smaller than errors
    fontFamily: "Nunito",          // Consistent typography
    marginBottom: 8,                // Space below message
  },
});

export default forgotPasswordStyles;
