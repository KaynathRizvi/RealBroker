import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: { flex: 1 },
  navbar: {
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  link: {
    fontSize: 16,
    marginRight: 15,
    color: '#007AFF',
  },
  logout: {
    color: 'red',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default homeStyles;
