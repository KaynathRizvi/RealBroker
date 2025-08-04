import { StyleSheet } from "react-native"

const viewSubscriptionStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f4f8",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
})

export default viewSubscriptionStyles
