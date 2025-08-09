import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main container for the screen
  container: {
    padding: 20,              // Inner spacing around content
    paddingTop: 40,           // Extra space at the top (good for headers/status bar)
    backgroundColor: '#f7f7f7', // Light gray background
    flexGrow: 1,              // Allows content to grow and scroll if needed
  },

  // Large title at the top
  title: {
    fontSize: 28,             // Large font size for emphasis
    fontWeight: '700',        // Bold text
    color: '#4a4a4a',         // Dark gray text
    marginBottom: 24,         // Space below the title
    textAlign: 'center',      // Centered horizontally
  },

  // Card-like box for displaying info
  infoBox: {
    backgroundColor: '#fff',  // White background for contrast
    borderRadius: 12,         // Rounded corners
    padding: 20,              // Inner padding
    shadowColor: '#000',      // iOS shadow color
    shadowOpacity: 0.1,       // Light shadow transparency
    shadowRadius: 6,          // Blur effect for shadow
    shadowOffset: { width: 0, height: 3 }, // Slight drop shadow
    elevation: 3,             // Android shadow depth
  },

  // Row container for each piece of information
  infoItem: {
    flexDirection: 'row',     // Arrange label & value side-by-side
    marginBottom: 16,         // Space between rows
  },

  // Label text style (e.g., "Email:")
  label: {
    width: 110,               // Fixed width so values align
    fontWeight: '600',        // Semi-bold text
    color: '#7a5af8',         // Pastel purple color for highlight
  },

  // Value text style (e.g., actual email address)
  value: {
    flex: 1,                  // Take up remaining space in row
    color: '#333',            // Darker gray for readability
  },
});

export default styles;
