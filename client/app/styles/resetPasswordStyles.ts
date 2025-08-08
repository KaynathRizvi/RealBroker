import { StyleSheet } from 'react-native';

const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formBox: {
    backgroundColor: "#ffffffee", // semi-transparent white
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#1f2937", // dark slate
    fontFamily: "Nunito",
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9d5ff',        // Light pastel lavender border
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Nunito',
    backgroundColor: '#f5f3ff',    // Soft lavender background
    shadowColor: '#d8b4fe',        // Soft lavender shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  button: {
    backgroundColor: '#f5f3ff', // Light lavender background
    borderColor: '#e9d5ff',     // Pastel lavender border
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#d8b4fe',     // Soft lavender shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  buttonText: {
    color: '#8b5cf6',            // Rich lavender text for contrast
    fontSize: 16,
    fontFamily: 'NunitoBold',
  },
  message: {
    color: 'red',
    fontFamily: 'Nunito',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  success: {
    color: 'green',
    fontFamily: 'Nunito',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default resetPasswordStyles;
