import { StyleSheet } from "react-native";

const viewSubscriptionStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdf8ff", // soft lavender-white background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf8ff",
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    // Removed justifyContent: "center" so content stays at top
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a2531ff", // deep pastel lavender
    textAlign: "center",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // frosted white
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e6d7f5", // light lavender border
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    marginTop: 10, // small space from top
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a2531ff", // pastel lavender
    marginBottom: 2,
  },
  valueText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#423589ff", // pastel blue-lavender
  },
});

export default viewSubscriptionStyles;
