import { useRouter } from "expo-router" // Expo Router for navigation
import { useState, useEffect } from "react"
import { Pressable, Text, TextInput, View, Alert, ActivityIndicator, TouchableOpacity, Switch } from "react-native"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage" // For storing local data (e.g., token, remembered login)
import styles from "../styles/loginStyles"
import { LinearGradient } from "expo-linear-gradient" // For background gradient
import { Ionicons } from "@expo/vector-icons" // Icons for password visibility toggle

// Determine server URL from Expo config
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function LoginPage() {
  const router = useRouter()

  // State variables for form inputs and UI behavior
  const [email, setEmail] = useState("") // User's email
  const [password, setPassword] = useState("") // User's password
  const [errorMessage, setErrorMessage] = useState("") // Error messages to display
  const [loading, setLoading] = useState(false) // Loading spinner state
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [rememberMe, setRememberMe] = useState(false) // Remember login credentials toggle

  // Load saved credentials when the component mounts
  useEffect(() => {
    loadRememberedCredentials()
  }, [])

  // Retrieve saved credentials from AsyncStorage
  const loadRememberedCredentials = async () => {
    const savedEmail = await AsyncStorage.getItem("rememberedEmail")
    const savedPassword = await AsyncStorage.getItem("rememberedPassword")
    if (savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }

  // Main login function
  const login = async () => {
    // Validate required fields
    if (!email || !password) {
      setErrorMessage("Please enter both email and password")
      return
    }

    // Validate email format
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address")
      return
    }

    setLoading(true) // Show loading spinner

    try {
      // Remove any previous token before logging in
      await AsyncStorage.removeItem("token")

      // Send login request to the server
      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Save token and email
        await AsyncStorage.setItem("token", data.token)
        await AsyncStorage.setItem("userEmail", email)

        // Save credentials if Remember Me is enabled
        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email)
          await AsyncStorage.setItem("rememberedPassword", password)
        } else {
          await AsyncStorage.removeItem("rememberedEmail")
          await AsyncStorage.removeItem("rememberedPassword")
        }

        setErrorMessage("") // Clear any error messages

        // Redirect based on subscription status
        if (data.hasActiveSubscription) {
          Alert.alert("Success", "Logged in successfully!")
          router.replace("/home") // Go to home screen
        } else {
          Alert.alert("Subscription Required", "Please purchase a subscription to continue.")
          router.replace("/subscription")
        }
      } else {
        // Show error message from server
        setErrorMessage(data.message || "Login failed")
        setPassword("") // Clear password field
      }
    } catch (error) {
      // Show network error
      Alert.alert("Network error", (error as Error).message || "Unknown error")
    } finally {
      setLoading(false) // Hide loading spinner
    }
  }

  return (
    <LinearGradient colors={["#e0f2fe", "#fdf2f8"]} style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Welcome Back 👋</Text>

        {/* Email input */}
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#6d628cff"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          editable={!loading}
        />

        {/* Password input with toggle visibility */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#6d628cff"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1 }]}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#8e7ebaff"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me switch */}
        <View style={styles.checkboxContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#d1d5db", true: "#8dd7d8ff" }}
            thumbColor={rememberMe ? "#fff" : "#f4f3f4"}
          />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>

        {/* Error message */}
        {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

        {/* Show loading spinner or buttons */}
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <>
            {/* Login button */}
            <Pressable style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            {/* Navigate to register */}
            <Pressable style={styles.button} onPress={() => router.push("/register")}>
              <Text style={styles.buttonText}>Go to Register</Text>
            </Pressable>

            {/* Forgot password link */}
            <Pressable style={styles.forgotButton} onPress={() => router.push("/forgotpassword")}>
              <Text style={styles.forgotButtonText}>Forgot Password?</Text>
            </Pressable>
          </>
        )}
      </View>
    </LinearGradient>
  )
}