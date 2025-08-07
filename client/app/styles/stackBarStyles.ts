// styles/stackBarStyles.ts
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ffff",
    borderRadius: 12,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#004d40",
  },
  chart: {
    borderRadius: 8,
  },
  noDataText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
})

export default styles
