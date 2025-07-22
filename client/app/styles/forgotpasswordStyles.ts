import { StyleSheet } from 'react-native';

const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 18,
    fontFamily: 'NunitoBold',
    marginBottom: 32,
    color: 'black', // dark gray
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Nunito',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  button: {
    backgroundColor: '#2563eb', // blue-600
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NunitoBold',
  },
   message: {
    color: 'red',
    fontFamily: 'Nunito',
    fontSize: 16,
  },
  success: {
    color: '#16a34a', // green-600
    fontSize: 14,
    fontFamily: 'Nunito',
    marginBottom: 8,
  },
});

export default forgotPasswordStyles;
