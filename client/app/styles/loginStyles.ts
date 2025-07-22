// styles/loginStyles.ts
import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 14,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Nunito',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NunitoBold',
  },
  forgotButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  forgotButtonText: {
    color: '#555',
    fontSize: 15,
    fontFamily: 'Nunito',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 26,
    fontFamily: 'NunitoBold',
    marginBottom: 24,
    textAlign: 'center',
    color: '2',
  },
});

export default loginStyles;
