import { Stack } from "expo-router"
import { useFonts } from 'expo-font'
import { useEffect } from "react"
import * as Linking from "expo-linking"
import { View, ActivityIndicator } from "react-native"
import InactivityHandler from "./component/InactivityHandler"

export default function Layout() {
  // 📦 1. Load custom fonts from assets folder
  const [fontsLoaded] = useFonts({
    Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  })

  // ⏳ 2. Show loading spinner until fonts are fully loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // 🔗 3. Handle deep link events (e.g., myapp://path)
  useEffect(() => {
    // Listen for incoming URLs while the app is running
    const subscription = Linking.addEventListener("url", (event) => {
      console.log("Received deep link:", event.url)
    })

    // 🧹 Cleanup listener on unmount
    return () => subscription.remove()
  }, [])

  // 🛡️ 4. Wrap the app stack with InactivityHandler to auto-logout after inactivity
  return (
    <InactivityHandler>
      <Stack /> {/* 🚏 Handles navigation stack for the entire app */}
    </InactivityHandler>
  )
}