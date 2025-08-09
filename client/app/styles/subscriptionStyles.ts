import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Main container for subscription screen, grows with content
  container: {
    flexGrow: 1,
    backgroundColor: "#c9deecff", // pastel pink background
    padding: 20,
  },

  // Loading spinner container, centered vertically and horizontally
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf2f8", // very light pink background
  },

  // Screen title styling
  title: {
    fontSize: 26,
    fontFamily: "Nunito",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: "#4b5563", // slate gray for good contrast
  },

  // Card container for each subscription plan
  planCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#9ca3af", // soft gray shadow color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,            // Android shadow
    borderWidth: 1,
    borderColor: "#fbcfe8", // pastel pink border for subtle accent
  },

  // Plan name text style
  planName: {
    fontSize: 20,
    fontFamily: "Nunito",
    fontWeight: "700",
    marginBottom: 6,
    color: "#144cc7ff", // pastel purple color
  },

  // Price text for each plan
  planPrice: {
    fontSize: 18,
    fontFamily: "Nunito",
    color: "#4065b4ff", // pastel blue color
    fontWeight: "700",
    marginBottom: 12,
  },

  // Individual feature text inside the plan card
  planFeature: {
    fontSize: 15,
    fontFamily: "Nunito",
    color: "#374151", // dark slate gray
    marginBottom: 6,
    paddingLeft: 5,   // slight indent for feature list
  },

  // Subscribe button styling
  subscribeButton: {
    backgroundColor: "#93c5fd", // pastel blue background
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
    shadowColor: "#93c5fd",     // blue shadow matching background
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,               // Android shadow
    borderWidth: 1.5,
    borderColor: "#3b82f6",    // deeper blue border for contrast
  },

  // Text inside the subscribe button
  subscribeButtonText: {
    color: "#1e3a8a",          // deep blue text for readability
    fontSize: 16,
    fontFamily: "Nunito",
    fontWeight: "700",
  },
});