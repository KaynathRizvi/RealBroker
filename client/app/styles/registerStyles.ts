import { StyleSheet } from 'react-native';

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 28,
    fontFamily: 'NunitoBold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#1f2937', // dark gray
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
  }
});

export default registerStyles
