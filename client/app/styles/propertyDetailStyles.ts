// styles/propertyDetailStyle.ts

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  imageScrollContainer: {
    marginBottom: 16,
  },
  thumbnailImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 12,
    lineHeight: 22,
  },
  requestButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
