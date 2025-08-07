import { StyleSheet } from 'react-native';

const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formBox: {
    backgroundColor: '#ffffffcc',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontFamily: 'NunitoBold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1f2937',
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
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
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
