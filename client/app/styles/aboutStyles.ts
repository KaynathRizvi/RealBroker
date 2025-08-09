import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main screen container
  container: {
    padding: 20,              // Space inside the container
    backgroundColor: '#fff',  // White background
    flex: 1,                  // Take up the full screen height
  },

  // Large heading text
  heading: {
    fontSize: 24,             // Large font size
    fontWeight: 'bold',       // Bold text
    marginBottom: 15,         // Space below heading
    color: '#333',            // Dark gray text
  },

  // Standard paragraph text
  paragraph: {
    fontSize: 16,             // Regular readable size
    lineHeight: 22,           // Line height for better readability
    marginBottom: 12,         // Space after paragraph
    color: '#555',            // Medium gray text
  },

  // Footer text at the bottom
  footer: {
    marginTop: 30,            // Space above footer
    textAlign: 'center',      // Center-aligned text
    fontSize: 14,             // Smaller font size
    color: '#888',            // Light gray text
  },
});

export default styles;
