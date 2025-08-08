import { StyleSheet } from 'react-native'

const navbarStyles = StyleSheet.create({
  navbar: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fdf6f9', // 🌸 Soft pastel pink background
    borderBottomWidth: 1,
    borderBottomColor: '#ebdff1',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2a2a2a',
    marginBottom: 12,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    fontSize: 16,
    color: '#5f7ad4ff', // 🧊 Cool pastel teal
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#dde5ffff', // Light mint blue
    borderWidth: 1,
    borderColor: '#c0cefdff',
  },
  logout: {
    color: '#c62828',
    backgroundColor: '#ffebee',
    borderColor: '#ef9a9a',
    borderWidth: 1,
  },
})

export default navbarStyles
