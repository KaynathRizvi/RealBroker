import { useEffect } from "react"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { ActivityIndicator, View, Text } from "react-native"
import { useState } from "react"

// 🌍 Load server URL from Expo config (development URL takes priority if available)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL

export default function Index() {
  const router = useRouter()

  // ⏳ Controls loading spinner visibility
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true // 🛡️ Avoid setting state if component unmounts mid-request

    /**
     * 🔐 Checks if user is logged in and has an active subscription
     */
    const checkLoginAndSubscription = async () => {
      // 📦 Get stored JWT token from local storage
      const token = await AsyncStorage.getItem("token")

      // 🚪 If no token found → send user to login screen
      if (!token) {
        router.replace("/login")
        return
      }

      try {
        // 🌐 Verify subscription status with backend
        const res = await fetch(`${SERVER_URL}/api/subscription/status`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
            "Content-Type": "application/json",
          },
        })

        const data = await res.json()

        // ✅ If user has an active subscription → go to home
        if (res.ok && data.hasActiveSubscription) {
          router.replace("/home")
        } else {
          // 💳 If no subscription → go to subscription page
          router.replace("/subscription")
        }
      } catch (err) {
        // ⚠️ Any network or server error → redirect to login
        console.error("Error checking subscription", err)
        router.replace("/login")
      } finally {
        // ⏹ Stop loading indicator
        if (isMounted) setLoading(false)
      }
    }

    checkLoginAndSubscription()

    // 🧹 Cleanup flag to prevent memory leaks
    return () => {
      isMounted = false
    }
  }, [])

  return (
    // 🎯 Center loading indicator & status text
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Checking your subscription...</Text>
    </View>
  )
}