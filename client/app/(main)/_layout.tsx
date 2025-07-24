"use client";

import { Stack, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import Navbar from "./navbar"; // Adjust path if needed

export default function RootLayout() {
  const pathname = usePathname();

  // Add all routes where you want to hide the navbar
  const hideNavbarOn = ["/subscription"];

  const shouldShowNavbar = !hideNavbarOn.includes(pathname);

  return (
    <View style={styles.container}>
      {shouldShowNavbar && <Navbar />}
      <Stack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
