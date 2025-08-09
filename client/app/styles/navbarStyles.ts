import { StyleSheet } from 'react-native'

const navbarStyles = StyleSheet.create({
  // Main navigation bar container
  navbar: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fdf6f9', // 🌸 Soft pastel pink background
    borderBottomWidth: 1,
    borderBottomColor: '#ebdff1', // light lavender border
    shadowColor: '#ccc', // subtle shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow falls slightly downward
    shadowOpacity: 0.06, // very soft shadow
    shadowRadius: 4, // slight blur
    elevation: 3, // Android shadow
  },

  // Main navbar title text
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2a2a2a', // dark gray text
    marginBottom: 12, // space below title
  },

  // Container for navigation links
  navLinks: {
    flexDirection: 'row', // arrange links horizontally
    gap: 18, // spacing between links
    alignItems: 'center',
    flexWrap: 'wrap', // allow wrapping to new line if space is small
  },

  // Base style for individual navigation links
  link: {
    fontSize: 16,
    color: '#5f7ad4ff', // 🧊 Cool pastel blue
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8, // rounded corners
    backgroundColor: '#dde5ffff', // light mint blue
    borderWidth: 1,
    borderColor: '#c0cefdff', // soft blue border
  },

  // Special styling for "Logout" link
  logout: {
    color: '#c62828', // red text
    backgroundColor: '#ffebee', // light pink background
    borderColor: '#ef9a9a', // soft red border
    borderWidth: 1,
  },
})

export default navbarStyles