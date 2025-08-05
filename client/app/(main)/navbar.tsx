// app/components/Navbar.tsx or app/(main)/Navbar.tsx

import { View, Text, ScrollView, Pressable } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import styles from "../styles/navbarStyles"

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("userEmail")
    router.replace("/login")
  }

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>🏠 Real Broker</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navLinks}>
        <Pressable onPress={() => router.push("/home")}>
          <Text style={styles.link}>Home</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/about")}>
          <Text style={styles.link}>About</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/properties")}>
          <Text style={styles.link}>Properties</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/profile")}>
          <Text style={styles.link}>Profile</Text>
        </Pressable>
        <Pressable onPress={handleLogout}>
          <Text style={[styles.link, styles.logout]}>Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}