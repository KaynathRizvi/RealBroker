import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Outer screen container
  container: {
    padding: 12,
    backgroundColor: '#fdf2f8ff', // 🌸 Soft pastel pink background
  },

  // Full-screen loading container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
    backgroundColor: '#fdf2f8', // matching pastel pink
  },

  // Loading message text
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280', // neutral gray
  },

  // Card container for each item
  card: {
    borderWidth: 1,
    borderColor: '#e9d5ff', // light purple border
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000', // subtle shadow
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  // Horizontal scroll container for images
  imageScrollContainer: {
    marginBottom: 10,
  },

  // Thumbnail images in scroll container
  thumbnailImage: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbeafe', // pastel blue border
  },

  // Title text inside card
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    color: '#27245eff', // deep pastel blue
  },

  // Detail text (e.g., status, role, etc.)
  detail: {
    fontSize: 15,
    marginTop: 4,
    color: '#10b981', // pastel green
  },

  // Email text styling
  email: {
    fontSize: 14,
    marginTop: 4,
    color: '#525863ff', // muted gray
  },
});

export default styles;