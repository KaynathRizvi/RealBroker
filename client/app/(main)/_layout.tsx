"use client"

import { Stack } from "expo-router"
import { View, StyleSheet } from "react-native"
import Navbar from "./navbar" // Make sure this path is correct

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Navbar />
      <Stack />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
