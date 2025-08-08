// subscriptionStyles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#c9deecff", // pastel pink background
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf2f8",
  },
  title: {
    fontSize: 26,
    fontFamily: "Nunito",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: "#4b5563", // Slate gray for contrast
  },
  planCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#9ca3af", // soft gray shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#fbcfe8", // pastel pink border
  },
  planName: {
    fontSize: 20,
    fontFamily: "Nunito",
    fontWeight: "700",
    marginBottom: 6,
    color: "#144cc7ff", // pastel purple
  },
  planPrice: {
    fontSize: 18,
    fontFamily: "Nunito",
    color: "#4065b4ff", // pastel blue
    fontWeight: "700",
    marginBottom: 12,
  },
  planFeature: {
    fontSize: 15,
    fontFamily: "Nunito",
    color: "#374151", // dark slate
    marginBottom: 6,
    paddingLeft: 5,
  },
  subscribeButton: {
    backgroundColor: "#93c5fd", // pastel blue
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
    shadowColor: "#93c5fd",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "#3b82f6", // deeper blue border
  },
  subscribeButtonText: {
    color: "#1e3a8a", // deep blue text for contrast
    fontSize: 16,
    fontFamily: "Nunito",
    fontWeight: "700",
  },

});
