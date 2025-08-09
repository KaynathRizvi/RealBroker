import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  // Main content wrapper for the Home screen
  content: {
    flex: 1,                      // Fill available space
    padding: 20,                  // Inner spacing
    backgroundColor: '#f5f7fa',   // Light, clean background
  },

  // Container for dashboard cards
  dashboardContainer: {
    gap: 20,                      // Space between items
    marginTop: 10,                 // Slight top spacing
  },

  // Username text style (e.g., "Welcome, John")
  userName: {
    color: '#1c327aff',           // Deep blue
    fontWeight: 'bold',           // Emphasize name
  },

  // Base card style (reused by different card types)
  card: {
    borderRadius: 16,             // Rounded corners
    padding: 20,                  // Inner spacing
    shadowColor: '#000',          // iOS shadow
    shadowOffset: { width: 0, height: 3 }, // Slight drop shadow
    shadowOpacity: 0.1,           // Light shadow
    shadowRadius: 6,              // Smooth shadow blur
    elevation: 4,                 // Android shadow depth
  },

  // Dashboard card variations by category
  subscriptionCard: {
    backgroundColor: '#e0f7e9',   // Light green
    borderLeftColor: "#75a989ff", // Green accent strip
    borderLeftWidth: 4,
  },
  requestCard: {
    backgroundColor: '#e8f1ff',   // Light blue
    borderLeftColor: "#7d92b4ff", // Blue accent strip
    borderLeftWidth: 4,
  },
  sentCard: {
    backgroundColor: '#fff2e5',   // Light orange
    borderLeftColor: "#e3b383ff", // Orange accent strip
    borderLeftWidth: 4,
  },
  statsCard: {
    backgroundColor: "#fbf0f9ff", // Soft pink/lavender
    borderLeftColor: "#d2a9caff", // Pink accent strip
    borderLeftWidth: 4,
  },
  propertyCard: {
    backgroundColor: "#f5f5f5", // Aqua/teal background
    borderLeftColor: "#333333",   // Teal accent strip
    borderLeftWidth: 4,
  },

  // Property list item card styling
  propertyItemCard: {
    backgroundColor: '#fff',      // White background
    borderRadius: 16,             // Rounded corners
    padding: 20,                  // Inner spacing
    shadowColor: '#000',          // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,                 // Android shadow
  },

  // Card title text
  cardTitle: {
    fontSize: 18,                  // Medium-large text
    fontWeight: 'bold',            // Bold for emphasis
    marginBottom: 10,               // Space below title
  },

  // General card body text
  cardText: {
    fontSize: 14,
    color: '#333',                 // Dark gray text
  },

  // Card button container
  cardButton: {
    marginTop: 10,                 // Space above button
    backgroundColor: '#007AFF',    // iOS blue
    paddingVertical: 10,           // Vertical padding
    paddingHorizontal: 16,         // Horizontal padding
    borderRadius: 10,              // Rounded button corners
    alignSelf: 'flex-start',       // Align to left inside card
  },

  // Card button text style
  cardButtonText: {
    color: '#fff',                 // White text
    fontWeight: '600',             // Semi-bold
    fontSize: 14,
  },

  // Greeting text (e.g., "Good Morning")
  greeting: {
    fontSize: 22,                  // Large text
    fontWeight: 'bold',
    color: '#1e1e1e',              // Near black
    marginBottom: 12,
  },

  // Informational paragraph text
  infoText: {
    fontSize: 14,
    color: '#555',                 // Medium gray
    lineHeight: 20,                // Comfortable reading
    marginBottom: 10,
  },

  // Smaller subtitle in cards
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },

  // Title for list items or sections
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },

  // Detail text below title
  detail: {
    fontSize: 14,
    color: "#666",                 // Slightly lighter gray
    marginTop: 4,
  },

  // Email text style
  email: {
    fontSize: 14,
    color: "#999",                 // Light gray
    marginTop: 2,
  }
});

export default homeStyles;