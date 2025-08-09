import { useState } from "react"
import { useRouter } from "expo-router"
import { Pressable, View, Text, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native"
import Constants from "expo-constants"
import styles from "./styles/forgotpasswordStyles"
import { LinearGradient } from "expo-linear-gradient"

// 🌍 Get server URL from Expo config (falls back to DEBUG_SERVER_URL in dev)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function ForgotPasswordScreen() {
  // 📩 User email input
  const [email, setEmail] = useState("")
  // ❌ Error message to show when request fails
  const [errorMessage, setErrorMessage] = useState("")
  // ✅ Success message to show when request is successful
  const [successMessage, setSuccessMessage] = useState("")
  // 🚪 Navigation hook from expo-router
  const router = useRouter()

  /**
   * 📧 Sends a password reset request to the backend
   */
  const handleReset = async () => {
    // 🛑 Validate input
    if (!email.trim()) {
      setErrorMessage("Email field cannot be empty.")
      setSuccessMessage("")
      return
    }

    try {
      // 🌐 POST request to backend
      const res = await fetch(`${SERVER_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      // ❌ If backend responds with error
      if (!res.ok) {
        setErrorMessage(data.message || "Something went wrong")
        setSuccessMessage("")
      } else {
        // ✅ Show success message
        setErrorMessage("")
        setSuccessMessage(data.message || "Check your email for reset link")
      }
    } catch (err) {
      // ⚠️ Network/connection error
      setErrorMessage("Network error. Please try again.")
      setSuccessMessage("")
    }
  }

  return (
    // 🎨 Gradient background for the whole screen
    <LinearGradient colors={["#e0f2fe", "#fdf2f8"]} style={styles.container}>
      {/* ⌨️ Adjust view when keyboard opens (especially on iOS) */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.formBox}
      >
        {/* 🏷️ Screen title */}
        <Text style={styles.title}>Reset Your Password 🔒</Text>

        {/* 📩 Email input field */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Your Email"
          placeholderTextColor="#6d628cff"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        {/* ⚠️ Error message */}
        {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

        {/* 🎉 Success message */}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

        {/* 📤 Submit button */}
        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </Pressable>

        {/* 🔙 Navigate back to login */}
        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Go Back to Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}
