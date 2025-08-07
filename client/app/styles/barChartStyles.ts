import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    margin: 10,
    elevation: 6, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  heading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2f3542",
    textAlign: "center",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
    alignSelf: "center",
  },
})
