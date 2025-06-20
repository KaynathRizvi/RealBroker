import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
