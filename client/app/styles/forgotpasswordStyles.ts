import { StyleSheet } from "react-native";

const forgotPasswordStyles = StyleSheet.create({
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
    fontFamily: "Nunito", // slate-900
  },
  input: {
    borderWidth: 1,
    borderColor: "#bae6fd",         // Soft pastel blue border
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Nunito",
    backgroundColor: "#e0f2fe",     // Pastel blue background
    shadowColor: "#bae6fd",         // Soft blue shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    backgroundColor: '#e0f2fe', // Pastel baby blue
    borderColor: '#bae6fd',     // Lighter blue border
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#7dd3fc',     // Soft blue shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#0284c7',            // Rich pastel blue text
    fontSize: 16,
    fontFamily: 'NunitoBold',
  },
  message: {
    color: "red",
    fontFamily: "Nunito",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  success: {
    color: "#16a34a", // green-600
    fontSize: 14,
    fontFamily: "Nunito",
    marginBottom: 8,
  },
});

export default forgotPasswordStyles;
