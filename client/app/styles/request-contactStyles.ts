import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#333',
  textAlign: 'center',
},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
});

export default styles;
