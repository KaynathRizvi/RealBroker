import { useEffect } from "react"
import { Redirect, useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { ActivityIndicator, View, Text } from "react-native"
import { useState } from "react"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL

export default function Index() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const checkLoginAndSubscription = async () => {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        router.replace("/login")
        return
      }

      try {
        const res = await fetch(`${SERVER_URL}/api/subscription/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        const data = await res.json()
        if (res.ok && data.hasActiveSubscription) {
          router.replace("/home")
        } else {
          router.replace("/subscription")
        }
      } catch (err) {
        console.error("Error checking subscription", err)
        router.replace("/login")
      } finally {
        setLoading(false)
      }
    }

    checkLoginAndSubscription()
    return () => {
      isMounted = false
    }
}, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Checking your subscription...</Text>
    </View>
  )
}