import { StyleSheet } from 'react-native'

const registerStyles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  // Registration form box
  formBox: {
    backgroundColor: "#ffffffee", // semi-transparent white background
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000", // soft drop shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6, // Android shadow
    maxWidth: 400, // limit width for larger screens
    width: "100%",
    alignSelf: "center",
  },

  // Form title text
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#1f2937", // dark slate
    fontFamily: "Nunito",
  },

  // Input field style
  input: {
    borderWidth: 1,
    borderColor: "#c7d2fe",         // soft pastel lavender border
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Nunito",
    backgroundColor: "#f3e8ff",     // lavender background
    shadowColor: "#c7d2fe",         // lavender shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // Container for password input + eye icon
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  // Eye icon for show/hide password
  eyeIcon: {
    marginLeft: -40, // overlay on right side of input
    padding: 10,
    marginBottom: 10,
  },

  // Submit button style
  button: {
    backgroundColor: '#e0f2fe', // pastel baby blue
    borderColor: '#bae6fd',     // lighter blue border
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#7dd3fc',     // soft blue shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Button text style
  buttonText: {
    color: '#0284c7',            // rich pastel blue text
    fontSize: 16,
    fontFamily: 'NunitoBold',
  },

  // Container for checkbox + label
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  // Checkbox label text
  checkboxLabel: {
    marginLeft: 8,
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#374151', // neutral dark gray
  },

  // Error or validation message
  message: {
    color: 'red',
    fontFamily: 'Nunito',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
})

export default registerStyles