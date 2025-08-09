// styles/resetPasswordStyles.ts
import { StyleSheet } from 'react-native';

const resetPasswordStyles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    justifyContent: "center", // center vertically
    alignItems: "center",     // center horizontally
    paddingHorizontal: 16,    // horizontal padding
    paddingVertical: 24,      // vertical padding
  },

  // Box containing the form elements
  formBox: {
    backgroundColor: "#ffffffee", // semi-transparent white background
    borderRadius: 16,             // rounded corners
    padding: 24,                  // space inside the box
    shadowColor: "#000",          // black shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,           // light shadow
    shadowRadius: 8,
    elevation: 6,                 // Android shadow
    maxWidth: 400,                 // limits width on large screens
    width: "100%",
    alignSelf: "center",
  },

  // Page title text
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#1f2937", // dark slate color
    fontFamily: "Nunito",
  },

  // Input fields
  input: {
    borderWidth: 1,
    borderColor: '#e9d5ff',        // light pastel lavender border
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Nunito',
    backgroundColor: '#f5f3ff',    // soft lavender background
    shadowColor: '#d8b4fe',        // lavender shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,                  // Android shadow
  },

  // Main action button
  button: {
    backgroundColor: '#f5f3ff', // light lavender background
    borderColor: '#e9d5ff',     // pastel lavender border
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#d8b4fe',     // soft lavender shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Button text styling
  buttonText: {
    color: '#8b5cf6',     // rich lavender text for contrast
    fontSize: 16,
    fontFamily: 'NunitoBold',
  },

  // Error message text
  message: {
    color: 'red',
    fontFamily: 'Nunito',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },

  // Success message text
  success: {
    color: 'green',
    fontFamily: 'Nunito',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default resetPasswordStyles;