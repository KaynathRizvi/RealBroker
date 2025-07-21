// styles/navbarStyles.ts
import { StyleSheet } from 'react-native';

const navbarStyles = StyleSheet.create({
  navbar: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  link: {
    fontSize: 16,
    color: '#007bff',
  },
  logout: {
    color: 'red',
    marginLeft: 10,
  },
});

export default navbarStyles;
