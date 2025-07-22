import { Stack } from "expo-router"
import { useEffect } from "react"
import * as Linking from "expo-linking"
import { Platform } from "react-native"

export default function Layout() {
  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      console.log("Received deep link:", event.url)
    })
    return () => subscription.remove()
  }, [])

  return <Stack />
}
