import { StyleSheet } from "react-native"

// Styles for a form screen (centered login/register layout)
const styles = StyleSheet.create({
  // Main container that centers content on the screen
  container: {
    flex: 1,                          // Take full height
    justifyContent: "center",         // Center vertically
    alignItems: "center",              // Center horizontally
    paddingHorizontal: 16,             // Space on left & right
    paddingVertical: 24,               // Space top & bottom
  },

  // Form box styling (card-like container)
  formBox: {
    backgroundColor: "#ffffffee",      // Semi-transparent white
    borderRadius: 16,                  // Rounded corners
    padding: 24,                        // Inner padding
    shadowColor: "#000",                // iOS shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.1,                 // Light shadow
    shadowRadius: 8,                    // Shadow blur
    elevation: 6,                       // Android shadow depth
    maxWidth: 400,                      // Prevents overly wide layout
    width: "100%",                      // Full width up to maxWidth
    alignSelf: "center",                // Centers the box in parent
  },

  // Title text at top of form
  title: {
    fontSize: 28,                       // Large title font
    fontWeight: "bold",                 // Bold style
    marginBottom: 32,                   // Space below
    textAlign: "center",                // Center text
    color: "#1f2937",                   // Dark slate
    fontFamily: "Nunito",               // Custom font
  },

  // Input field styling
  input: {
    borderWidth: 1,                     // Outline border
    borderColor: "#c7d2fe",              // Soft lavender border
    marginBottom: 16,                   // Space below input
    paddingVertical: 14,                // Vertical padding inside
    paddingHorizontal: 16,              // Horizontal padding inside
    borderRadius: 12,                   // Rounded edges
    fontSize: 16,                        // Text size
    fontFamily: "Nunito",               // Custom font
    backgroundColor: "#f3e8ff",          // Light lavender background
    shadowColor: "#c7d2fe",              // Lavender shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,                 // Very light shadow
    shadowRadius: 4,
    elevation: 2,                        // Android shadow
  },

  // Container for password input + eye icon
  passwordContainer: {
    flexDirection: "row",               // Side-by-side layout
    alignItems: "center",                // Align vertically
    marginBottom: 10,
  },

  // Eye icon styling for toggling password visibility
  eyeIcon: {
    marginLeft: -40,                     // Move icon inside field
    padding: 10,
    marginBottom: 10,
  },

  // Row container for checkbox & label
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  // Checkbox label text
  checkboxLabel: {
    fontSize: 15,
    fontFamily: "Nunito",
    color: "#374151",                     // Slate gray
    marginLeft: 8,                        // Space from checkbox
  },

  // Main action button styling
  button: {
    backgroundColor: '#e0f2fe',           // Baby blue background
    borderColor: '#bae6fd',               // Lighter blue border
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',                 // Center text
    shadowColor: '#7dd3fc',               // Soft blue shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,                         // Android shadow
  },

  // Text inside the main button
  buttonText: {
    color: '#0284c7',                     // Rich blue text
    fontSize: 16,
    fontFamily: 'NunitoBold',             // Bold custom font
  },

  // "Forgot password" button container
  forgotButton: {
    marginTop: 18,
    alignItems: "center",
    marginBottom: 16,
  },

  // Text for "Forgot password" link
  forgotButtonText: {
    color: "#4b5563",                     // Muted slate color
    fontSize: 15,
    fontFamily: "Nunito",
    textDecorationLine: "underline",      // Underlined for link style
  },

  // Error message text styling
  message: {
    color: "red",                         // Error color
    fontFamily: "Nunito",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
})

export default styles