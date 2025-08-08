import { StyleSheet } from 'react-native'

const registerStyles = StyleSheet.create({
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
    borderColor: "#c7d2fe",         // Soft pastel lavender border
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Nunito",
    backgroundColor: "#f3e8ff",     // Lavender background
    shadowColor: "#c7d2fe",         // Lavender shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  eyeIcon: {
    marginLeft: -40,
    padding: 10,
    marginBottom: 10,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontFamily: 'Nunito',
    fontSize: 16,
    color: '#374151',
  },
   message: {
    color: 'red',
    fontFamily: 'Nunito',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
})

export default registerStyles
