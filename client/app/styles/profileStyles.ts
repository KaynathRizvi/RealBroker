import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1, // take full screen height
    paddingTop: 15, // space from top
  },

  // Loader screen container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
    backgroundColor: '#fdf2f8', // soft pastel pink background
  },

  // Form wrapper
  formBox: {
    padding: 20, // inner spacing for form content
  },

  // Main form title
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25, // space below title
    textAlign: 'center',
  },

  // Field label text
  label: {
    fontSize: 16,
    marginBottom: 6, // small gap below label
    color: '#1f2937', // slate-900 for good readability
  },

  // Input field styling
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300 border
    borderRadius: 10,
    padding: 12,
    marginBottom: 15, // space below input
    backgroundColor: '#fff',
    fontSize: 16,
  },

  // Disabled input field styling
  disabledInput: {
    backgroundColor: '#f3f4f6', // light gray background
    color: '#9ca3af', // muted text color
  },

  // Main action button
  button: {
    backgroundColor: '#799cc9ff', // soft blue
    borderWidth: 1,
    borderColor: '#799cc9ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000', // subtle shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  // Text inside main button
  buttonText: {
    color: '#fcfcfcff', // off-white text
    fontSize: 16,
    fontWeight: '600',
  },

  // Error message text
  errorText: {
    color: '#f03737ff', // pastel pink/red
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '300',
  },
});

export default styles;