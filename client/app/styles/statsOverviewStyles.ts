import { StyleSheet } from "react-native"

export const statColors: Record<string, { text: string; border: string }> = {
  "Total Listings": { text: "#0984e3", border: "#0984e3" },
  "My Listings": { text: "#6c5ce7", border: "#6c5ce7" },
  "Requests Received": { text: "#6adadaff", border: "#6adadaff" },
  "Requests Sent": { text: "#e17055", border: "#e17055" },
  "New This Week": { text: "#fdcb6e", border: "#fdcb6e" },
  "Days Left": { text: "#d63031", border: "#d63031" },
}


const statsStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e1e1e",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    color: "#2d3436",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  row: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 10,
  marginTop: 10,
},
lineChartContainer: {
  backgroundColor: "#e0f7fa",
  borderRadius: 12,
  padding: 10,
  flex: 1,
},
barChartContainer: {
  backgroundColor: "#fce4ec",
  borderRadius: 12,
  padding: 10,
  flex: 1,
},
stackBarContainer: {
  backgroundColor: "#f1f8e9",
  borderRadius: 12,
  padding: 10,
  flex: 1.4,
  marginRight: 5,
},
pieChartContainer: {
  backgroundColor: "#fff3e0",
  borderRadius: 12,
  padding: 10,
  flex: 1.4,
},
gaugeContainer: {
  backgroundColor: "#ede7f6",
  borderRadius: 12,
  padding: 10,
  marginTop: 10,
},
chartStyle: {
  borderRadius: 8,
},

})



export default statsStyles
