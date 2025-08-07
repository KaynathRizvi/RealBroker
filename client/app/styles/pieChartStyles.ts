// pieChartStyles.ts
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  legendContainer: {
    paddingTop: 10,
    alignItems: "center", // 💡 Center for both orientations
    justifyContent: "center",
    width: "100%",
  },
})

export default styles
