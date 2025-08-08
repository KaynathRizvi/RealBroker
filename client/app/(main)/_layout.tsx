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
      <Stack>
        <Stack.Screen name="sent-requests" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="myproperty" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="properties" options={{ headerShown: false }} />
        <Stack.Screen name="propertyDetail" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="subscription" options={{ headerShown: false }} />
        <Stack.Screen name="view-requests" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="viewsubscription" options={{ headerShown: false }} />
        <Stack.Screen name="statsOverview" options={{ headerShown: false }} />
        <Stack.Screen name="request-contact" options={{ headerShown: false }} />
        <Stack.Screen name="contactPage" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
