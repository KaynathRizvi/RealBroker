// components/Navbar.tsx
import { View, Text, ScrollView, StyleSheet } from "react-native"
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
      <Text style={styles.title}>BrokerApp</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navLinks}>
        <Text style={styles.link} onPress={() => router.push("/home")}>
          Home
        </Text>
        <Text style={styles.link} onPress={() => router.push("/about")}>
          About
        </Text>
        <Text style={styles.link} onPress={() => router.push("/properties")}>
          Properties
        </Text>
        <Text style={styles.link} onPress={() => router.push("/profile")}>
          Profile
        </Text>
        <Text style={[styles.link, styles.logout]} onPress={handleLogout}>
          Logout
        </Text>
      </ScrollView>
    </View>
  )
}