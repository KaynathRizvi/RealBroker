// styles/request-contactStyles.ts
import { StyleSheet } from 'react-native';

// Define styles as a constant
const requestContactStyles = StyleSheet.create({
  // Main container for the request contact form screen
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#eef4ff', // soft blue background
    alignItems: 'center',       // center horizontally
    justifyContent: 'center',   // center vertically
  },

  // Card-like container for the form fields
  formCard: {
    width: '100%',
    backgroundColor: '#fff', // white background
    borderRadius: 16,        // rounded corners
    padding: 20,
    shadowColor: '#000',     // soft drop shadow
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,            // Android shadow
  },

  // Page or form title
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#334155', // grey-blue text
  },

  // Label text for inputs
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280', // grey tone
    marginBottom: 6,
  },

  // Standard text input styling
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',   // light grey border
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9fafb', // very light grey background
    marginBottom: 16,
    color: '#374151',           // dark text
  },

  // Larger text input for message content
  messageInput: {
    height: 120,               // taller height for multi-line text
    textAlignVertical: 'top',  // start text from top instead of center
  },

  // Primary action button
  button: {
    backgroundColor: '#4f46e5', // indigo
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#4f46e5',     // colored shadow
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  // Text inside the primary button
  buttonText: {
    color: '#fff',  // white text
    fontSize: 17,
    fontWeight: '600',
  },

  // Success message text (e.g., form submitted successfully)
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },

  // Error message text (e.g., form submission failed)
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },

  // Inline error text for specific form fields
  errorText: {
    color: "#dc2626", // red
    fontSize: 12,
    marginBottom: 10,
  },
});

export default requestContactStyles;