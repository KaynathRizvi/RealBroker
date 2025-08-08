import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f3ffff", // soft lavender blue background
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageScrollContainer: {
    marginBottom: 16,
  },
  thumbnailImage: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a345cff", // bright pastel blue
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
    color: "#4b5563", // neutral grey
  },
  description: {
    fontSize: 16,
    color: "#6b7280", // softer grey
    marginTop: 12,
    lineHeight: 22,
  },
  requestButton: {
    backgroundColor: "#4f46e5", // pastel blue
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
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
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});
