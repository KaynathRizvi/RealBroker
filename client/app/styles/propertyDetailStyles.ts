import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Main container for the screen
  container: {
    padding: 16,
    backgroundColor: "#f9f3ffff", // 🌸 Soft lavender-blue background
  },

  // Centered layout (for empty states/loading states)
  center: {
    flex: 1,
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    padding: 20,
  },

  // Horizontal scroll area for images
  imageScrollContainer: {
    marginBottom: 16,
  },

  // Large thumbnail image style
  thumbnailImage: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginRight: 10,
  },

  // Title text style
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a345cff", // bright pastel blue
  },

  // Short detail text (e.g., meta info)
  detail: {
    fontSize: 16,
    marginBottom: 4,
    color: "#4b5563", // neutral gray
  },

  // Longer description text
  description: {
    fontSize: 16,
    color: "#6b7280", // softer gray
    marginTop: 12,
    lineHeight: 22, // better readability
  },

  // Primary "Request" button
  requestButton: {
    backgroundColor: "#4f46e5", // pastel blue
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000", // subtle shadow
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  // Text for the request button
  requestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Secondary "Back" button
  backButton: {
    backgroundColor: "#3d37adff", // light lavender blue
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  // Text for the back button
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});