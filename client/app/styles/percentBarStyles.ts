import { StyleSheet } from "react-native"

const percentBarStyles = StyleSheet.create({
  barContainer: {
    marginBottom: 12,
  },
  barLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  barBackground: {
    height: 10,
    backgroundColor: "#dfe6e9",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFillBase: {
    height: 10,
    borderRadius: 5,
  },
  barFill0: {
    backgroundColor: "#a29bfe",
  },
  barFill1: {
    backgroundColor: "#81ecec",
  },
  barFill2: {
    backgroundColor: "#e48871ff",
  },
  barFill3: {
    backgroundColor: "#ffeaa7",
  },
})

export default percentBarStyles